import _ from 'lodash'
import log from '../util/Logger'

import { Event, IEvent } from '../Event'
import { Phase, IPhase } from './Phase'
import { PhaseGroup, IPhaseGroup } from './PhaseGroup'
import { Entrant, IEntrant } from './Entrant'
import { Attendee, IAttendee } from './Attendee'
import { GGSet, IGGSet } from './GGSet'
import { IStandings, Standings } from '../Standings'

import NI from '../util/NetworkInterface'
import * as queries from '../scripts/leagueQueries'
import { ILeague, ILeagueAttributes, ILeagueData, ILeagueEventData, ILeagueStandingData } from '../interfaces/ILeague'

export class League implements ILeague {
	public static parse(data: ILeagueAttributes): League {
		return new League(
			data.id,
			data.name,
			data.slug,
			data.url,
			data.startAt,
			data.endAt,
			data.shortSlug,
		)
	}

	public static parseFull(data: ILeagueData): League {
		return League.parse(data.league)
	}

	public static async getById(id: number): Promise<League> {
		log.info('Getting League with id %s', id)
		const data: ILeagueData = await NI.query(queries.league, { id })
		return League.parseFull(data)
	}

	public static async get(slug: string): Promise<League> {
		log.info('Getting League with slug "%s"', slug)
		const data: ILeagueData = await NI.query(queries.leagueBySlug, { slug })
		return League.parseFull(data)
	}

	public id: number
	public name: string
	public slug: string
	public url: string
	public startAt: number
	public endAt: number
	public shortSlug: string

	constructor(
		id: number,
		name: string,
		slug: string,
		url: string,
		startAt: number,
		endAt: number,
		shortSlug: string,
	) {
		this.id = id
		this.name = name
		this.slug = slug
		this.url = url
		this.startAt = startAt
		this.endAt = endAt
		this.shortSlug = shortSlug
	}

	public getId(): number {
		return this.id
	}

	public getName(): string {
		return this.name
	}

	public getSlug(): string {
		return this.slug
	}

	public getUrl(): string {
		return this.url
	}

	public getStartAt(): number {
		return this.startAt
	}

	public getEndAt(): number {
		return this.endAt
	}

	public getShortSlug(): string {
		return this.shortSlug
	}

	public async getStandingsRaw(): Promise<any[]> {
		const { id, name } = this
		log.info('Getting Standings for Event [%s :: %s]', id, name)
		const options = { page: 1 }
		const data: ILeagueStandingData[] = await NI.paginatedQuery(
			`Event Entrants [${id} :: ${name}]`,
			queries.leagueStandings,
			{ id },
			options,
			{},
			2,
		)
		const standingData = _.flatten(data.map(d => d.league.standings.nodes))
		return standingData
	}

	public async getStandings(): Promise<Standings[]> {
		const { id } = this
		const standingData = await this.getStandingsRaw()
		const standings: Standings[] = standingData.map(item => Standings.parse(item, id))
		return standings
	}

	public async getEvents(): Promise<Event[]> {
		const { id, name } = this
		log.info('Getting Events for League [%s :: %s]', id, name)
		const data: ILeagueEventData = await NI.query(queries.leagueEvents, { id })
		const events = data.league.events.nodes.map(event => Event.parse(event))
		return events
	}
}