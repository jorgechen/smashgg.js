import _ from 'lodash'
import log from 'winston'
import pmap from 'p-map'
import { format } from 'util'
import moment from 'moment'
import request from 'request-promise'
import { EventEmitter } from 'events'

import Cache from './util/Cache'
import Player from './Player'
import GGSet from './GGSet'
import Encoder from './util/Encoder'

import { ICommon } from './util/Common'
import { IPlayer } from './Player'
import { IGGSet } from './GGSet'

/* Convenience */
import Data = IPhaseGroup.Data
import Entity = ICommon.Entity
import Options = ICommon.Options
import Expands = IPhaseGroup.Expands
import PlayerEntity = IPlayer.Entity
import PhaseGroupOptions = IPhaseGroup.Options
import parseOptions = ICommon.parseOptions

/* Constants */
const PHASE_GROUP_URL = 'https://api.smash.gg/phase_group/%s?%s';
const LEGAL_ENCODINGS = ['json', 'utf8', 'base64'];
const DEFAULT_ENCODING = 'json';

export default class PhaseGroup extends EventEmitter implements IPhaseGroup.PhaseGroup{

	id: number = 0
	url: string = ''
	data: Data | string = IPhaseGroup.getDefaultData()
	isCached: boolean = true
	rawEncoding: string = 'JSON'
	expandsString: string = ''
	expands: Expands = IPhaseGroup.getDefaultExpands()
	players: Array<Player> = []
	sets: Array<GGSet> = []


	constructor(id: number, options: PhaseGroupOptions={}){
		super();

		if(!id)
			throw new Error('ID cannot be null for Phase Group');

		// parse options
		let expands = options.expands;
		let isCached = options.isCached != undefined ? options.isCached === true : true;
		let rawEncoding = options.rawEncoding || DEFAULT_ENCODING;

		// set properties
		this.id = id;
		this.isCached = isCached;
		this.rawEncoding = LEGAL_ENCODINGS.includes(rawEncoding) ? rawEncoding : DEFAULT_ENCODING;

		// CREATE THE EXPANDS STRING
		this.expandsString = '';
		this.expands = {
			sets: (expands && expands.sets == false) ? false : true,
			entrants: (expands && expands.entrants == false) ? false : true,
			standings: (expands && expands.standings == false) ? false : true,
			seeds: (expands && expands.seeds == false) ? false : true
		};
		for(let property in this.expands){
			if(this.expands.hasOwnProperty(property))
				this.expandsString += format('expand[]=%s&', property);
		}

		this.url = format(PHASE_GROUP_URL, this.id, this.expandsString);
		let ThisPhaseGroup = this;
		this.load()
			.then(function(){
				let cacheKey = format('phasegroup::%s::%s', ThisPhaseGroup.id, ThisPhaseGroup.expandsString);
				Cache.set(cacheKey, ThisPhaseGroup);
			})
			.then(function(){
				ThisPhaseGroup.emitPhaseGroupReady();
			})
			.catch(function(err){
				console.error('Error creating Tournament. For more info, implement PhaseGroup.on(\'error\')');
				log.error('Phase Group: %s', err.message);
				ThisPhaseGroup.emitPhaseGroupError(err);
			});
	}

	loadData(data: Data) : Data | string{
		let encoded = this.rawEncoding == 'json' ? data : new Buffer(JSON.stringify(data)).toString(this.rawEncoding);
		this.data = encoded;
		return encoded;
	}

	getData() : Data{
		let decoded = this.rawEncoding == 'json' ? this.data : JSON.parse(new Buffer(this.data.toString(), this.rawEncoding).toString('utf8'));
		return decoded;
	}

	// Convenience Methods
	static getPhaseGroup(id: number, options: Options={}) : Promise<PhaseGroup>{
		return new Promise(function(resolve, reject){
			try{
				let PG = new PhaseGroup(id, options);
				PG.on('ready', function(){
					resolve(PG);
				});
				PG.on('error', function(e){
					log.error('getPhaseGroup error: %s',e);
					reject(e);
				});
			} catch(e){
				log.error('getPhaseGroup error: %s',e);
				reject(e);
			}
		});
	}

	// Methods
	async load() : Promise<Data | string>{
		log.debug('PhaseGroup.load called');
		log.verbose('Creating Phase Group from url: %s', this.url);
		try{
			if(!this.isCached)
				return await request(this.url);

			let cacheKey = format('phasegroup::%s::%s::%s::data', this.id, this.rawEncoding, this.expandsString);
			let cached = await Cache.get(cacheKey);

			if(!cached){
				let response = await request(this.url);
				let encoded = this.loadData(JSON.parse(response));
				await Cache.set(cacheKey, encoded);
				return encoded;
			}
			else {
				this.data = cached;
				return this.data;
			}
		} catch(e){
			log.error('PhaseGroup.load error: %s', e.message);
			
			if(e.name === 'StatusCodeError' && e.message.indexOf('404') > -1){
				let s = format('No Phase Group with id [%s] ( %s )', this.id, this.url);
				log.error(s);
			}
			
			throw e;
		}
	}

	/** PROMISES **/
	async getPlayers(options: Options={}) : Promise<Array<Player>>{
		log.debug('PhaseGroup.getPlayers called');
		try {
			if(this.getData().entities.entrants){
				
				// parse options
				options = parseOptions(options)

				let cacheKey = format('phasegroup::%s::players', this.id);
				if (options.isCached) {
					let cached = await Cache.get(cacheKey);
					if (cached) {
						this.players = cached
						return cached;
					}
				}

				let entrants: Array<IPlayer.Entity> = this.getEntrants();
				let players: Array<Player> = entrants.map(entrant => {
					return Player.resolve(entrant);
				});

				this.players = players;
				await Cache.set(cacheKey, this.players);
				return this.players;
			}
			else throw new Error('Must have \'entrants\' expands set to true');
		}catch(err){
			log.error('PhaseGroup.getPlayers: ' + err);
			throw err;
		}
	}
	
	async getSets(options: Options={}) : Promise<Array<GGSet>>{
		// parse options
		options = parseOptions(options)

		try {
			if (!this.players)
				await this.getPlayers(options);

			// Caching logic
			let cacheKey = format('phasegroup::%s::sets', this.id);
			if (options.isCached) {
				let cached = await Cache.get(cacheKey);
				if (cached) {
					this.sets = cached;
					return cached;
				}
			}

			// Fetching logic
			if(this.getData().entities.sets){
				let sets: Array<GGSet>;
				let entities: Array<IGGSet.Entity> = this.getData().entities.sets as Array<IGGSet.Entity>;
				sets = await pmap(entities, GGSet.resolve, {concurrency: options.concurrency}) as Array<GGSet>;
				sets = sets.filter(set => { return set != undefined; });
				this.sets = sets;
			}
			
			await Cache.set(cacheKey, this.sets);
			return this.sets;
		} catch(err){
			log.error('PhaseGroup.getSets: ' + err);
			throw err;
		}
	}

	async getCompleteSets(options: Options={}) : Promise<Array<GGSet>>{
		log.verbose('PhaseGroup getCompleteSets called');

		try{
			//parse options
			options = parseOptions(options)

			let sets: Array<GGSet> = await this.getSets(options);
			let completeSets: Array<GGSet> = sets.filter(set => { return set.isComplete == true; });
			return completeSets;			
		} catch(e){
			log.error('PhaseGroup getCompleteSets error: %s', e);
			throw e;
		}
	}

	async getIncompleteSets(options: Options={}) : Promise<Array<GGSet>>{
		log.verbose('PhaseGroup getIncompleteSets called');

		try{
			//parse options
			options = parseOptions(options)

			let sets: Array<GGSet> = await this.getSets(options);
			let completeSets: Array<GGSet> = sets.filter(set => { return set.isComplete == false; });
			return completeSets;			
		} catch(e){
			log.error('PhaseGroup getIncompleteSets error: %s', e);
			throw e;
		}
	}

	// TODO needs coverage
	async getSetsXMinutesBack(minutes: number, options: Options={}) : Promise<Array<GGSet>>{
		log.verbose('PhaseGroup getSetsXMinutesBack called');

		try{
			// parse options			
			options = parseOptions(options)
			options.isCached = false

			let now = moment();
			let sets: Array<GGSet> = await this.getSets(options);
			let filtered: Array<GGSet> = sets.filter(set => {
				let then = moment(set.getCompletedAt() as Date);
				let diff = moment.duration(now.diff(then));

				let diffMinutes = diff.minutes();
				if(diff.hours() > 0 || diff.days() > 0 || diff.months() > 0 || diff.years() > 0) 
					return false;
				else 
					return diffMinutes <= minutes && diffMinutes >= 0 && set.getIsComplete();
			});
			return filtered;
		} catch(e){
			log.error('PhaseGroup getSetsXMinutesBack error: %s', e);
			throw e;
		}
	}

	async resolveSet(set: IGGSet.Entity) : Promise<GGSet | undefined>{
		try{
			if (!set.entrant1Id || !set.entrant2Id)
				return; // HANDLES BYES

			let Player1 = await this.findPlayerByParticipantId(set.entrant1Id);
			let Player2 = await this.findPlayerByParticipantId(set.entrant2Id);

			if (!Player1 || !Player2)
				return; // HANDLES Error of some sort

			let isComplete = false;
			if(set.winnerId && set.loserId)
				isComplete = true;

			let S;
			if(isComplete)
				S = new GGSet(set.id, set.eventId, set.fullRoundText, Player1, Player2, isComplete, set.entrant1Score, set.entrant2Score, set.winnerId, set.loserId, set);
			else
				S = new GGSet(set.id, set.eventId, set.fullRoundText, Player1, Player2, isComplete, undefined, undefined, undefined, undefined, set);
			
			S.loadData(set);
			return S;
		} catch(e){
			console.error(e.message);
			throw e;
		}
	}

	/** SIMPLE GETTERS **/
	getFromDataEntities(prop: string) : any{
		let data = this.getData();
		if(data && data.entities && data.entities.groups) {
			if (!data.entities.groups[prop])
				log.error(this.nullValueString(prop));
			return data.entities.groups[prop];
		}
		else{
			log.error('No data to get Tournament property Id');
			return null;
		}
	}

	getPhaseId() : number{
		return this.getFromDataEntities('phaseId');
	}

	getEntrants() : Array<IPlayer.Entity> | [] {
		if(this.getData().entities.entrants)
			return this.getData().entities.entrants as Array<IPlayer.Entity>;
		else return []
	}

	/** NULL VALUES **/
	nullValueString(prop: string) : string{
		return prop + ' not available for PhaseGroup ' + this.id;
	}

	/** EVENTS **/
	emitPhaseGroupReady() : void{
		this.emit('ready');
	}

	emitPhaseGroupError(err: Error) : void{
		this.emit('error', err);
	}

	/** OTHER **/
	async findPlayerByParticipantId(id: number) : Promise<Player | undefined>{
		if(!this.players)
			await this.getPlayers();
		let player: Player | undefined = _.find(this.players, {participantId: id});
		return player;
	}


}

PhaseGroup.prototype.toString = function(){
	return 'Phase Group:' +
		'\nID: ' + this.id + 
		'\nExpands: ' + JSON.stringify(this.expands) +
		'\nIsCached: ' + this.isCached;
};

export namespace IPhaseGroup{

	export interface PhaseGroup{
		id: number
		url: string
		data: Data | string,
		rawEncoding: string,
		expandsString: string,
		expands: Expands
		players: Array<Player>
		sets: Array<GGSet>

		loadData(data: Data) : Data | string
		getData() : Data
		load() : Promise<Data | string>
		getPlayers(options: Options) : Promise<Array<Player>>
		getSets(options: Options) : Promise<Array<GGSet>>
		getCompleteSets(options: Options) : Promise<Array<GGSet>>
		getIncompleteSets(options: Options) : Promise<Array<GGSet>>
		getSetsXMinutesBack(minutes: number, options: Options) : Promise<Array<GGSet>>
		resolveSet(set: IGGSet.Entity) : Promise<GGSet | undefined>
		getFromDataEntities(prop: string) : any
		getPhaseId() : number
		getEntrants() : Array<IPlayer.Entity> | [] 
		nullValueString(prop: string) : string
		emitPhaseGroupReady() : void
		emitPhaseGroupError(err: Error) : void
		findPlayerByParticipantId(id: number) : Promise<Player | undefined>
	}

	export interface Options{
		isCached?: boolean,
		rawEncoding?: string,
		expands?: Expands
	}

	export interface Expands{
		sets: boolean,
		entrants: boolean,
		standings: boolean,
		seeds: boolean
	}

	export interface Data{
		entities: {
			id: number,
			sets?: [IGGSet.Entity],
			entrants?: [PlayerEntity],
			standings?: [{
				[x: string]: any
			}],
			seeds?: [{
				[x: string]: any
			}],
			[x: string]: any
		}
	}

	export function parseOptions(options: Options) : Options{
		return{
			expands: {
				sets: (options.expands != undefined  && options.expands.sets == false) ? false : true,
				entrants: (options.expands != undefined  && options.expands.entrants == false) ? false : true,
				standings: (options.expands != undefined  && options.expands.standings == false) ? false : true,
				seeds: (options.expands != undefined  && options.expands.seeds == false) ? false : true
			},
			isCached: options.isCached != undefined ? options.isCached === true : true,
			rawEncoding: Encoder.determineEncoding(options.rawEncoding)
		}
	}

	export function getDefaultOptions(options: Options) : Options{
		return {
			isCached: true,
			rawEncoding: 'JSON',
			expands: getDefaultExpands()
		}
	}

	export function getDefaultData(): Data{
		return {
			entities:{
				id: 0
			}
		}
	}

	export function getDefaultExpands() : Expands{
		return {
			sets: true,
			entrants: true,
			standings: true,
			seeds: true
		}
	}
}