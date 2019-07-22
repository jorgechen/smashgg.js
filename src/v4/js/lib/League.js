"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const Logger_1 = __importDefault(require("./util/Logger"));
const Event_1 = require("./Event");
const Phase_1 = require("./Phase");
const PhaseGroup_1 = require("./PhaseGroup");
const Entrant_1 = require("./Entrant");
const Attendee_1 = require("./Attendee");
const GGSet_1 = require("./GGSet");
const Standing_1 = require("./Standing");
const NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
const queries = __importStar(require("./scripts/leagueQueries"));
class League {
    constructor(id, name, slug, url, startAt, endAt, shortSlug) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.url = url;
        this.startAt = startAt;
        this.endAt = endAt;
        this.shortSlug = shortSlug;
    }
    static parse(data) {
        return new League(data.id, data.name, data.slug, data.url, data.startAt, data.endAt, data.shortSlug);
    }
    static parseFull(data) {
        return League.parse(data.league);
    }
    static async getById(id) {
        Logger_1.default.info('Getting League with id %s', id);
        let data = await NetworkInterface_1.default.query(queries.league, { id });
        return League.parseFull(data);
    }
    static async get(slug) {
        Logger_1.default.info('Getting League with slug "%s"', slug);
        let data = await NetworkInterface_1.default.query(queries.leagueBySlug, { slug });
        return League.parseFull(data);
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getSlug() {
        return this.slug;
    }
    getUrl() {
        return this.url;
    }
    getStartAt() {
        return this.startAt;
    }
    getEndAt() {
        return this.endAt;
    }
    getShortSlug() {
        return this.shortSlug;
    }
    async getStandingsRaw() {
        const { id, name } = this;
        Logger_1.default.info('Getting Standings for Event [%s :: %s]', id, name);
        const options = { page: 1 };
        let data = await NetworkInterface_1.default.paginatedQuery(`Event Entrants [${id} :: ${name}]`, queries.leagueStandings, { id }, options, {}, 2);
        // return data
        let standingData = lodash_1.default.flatten(data.map(d => d.league.standings.nodes));
        return standingData;
    }
    async getStandings() {
        const { id } = this;
        let standingData = await this.getStandingsRaw();
        let standings = standingData.map(item => Standing_1.Standing.parse(item, id));
        return standings;
    }
    async getEvents() {
        const { id, name } = this;
        Logger_1.default.info('Getting Events for League [%s :: %s]', id, name);
        let data = await NetworkInterface_1.default.query(queries.leagueEvents, { id });
        let events = data.league.events.nodes.map(event => Event_1.Event.parse(event));
        return events;
    }
    async getPhases() {
        const { id, name } = this;
        Logger_1.default.info('Getting Phases for League [%s :: %s]', id, name);
        let data = await NetworkInterface_1.default.query(queries.leaguePhases, { id });
        let events = data.league.events;
        let phases = lodash_1.default.flatten(events.map(event => event.phases.map(phase => Phase_1.Phase.parse(phase, event.id))));
        return phases;
    }
    async getPhaseGroups() {
        const { id, name } = this;
        Logger_1.default.info('Getting Phase Groups for League [%s :: %s]', id, name);
        let data = await NetworkInterface_1.default.query(queries.leaguePhaseGroups, { id });
        let events = data.league.events;
        let phaseGroups = lodash_1.default.flatten(events.map(event => event.phaseGroups.map(group => PhaseGroup_1.PhaseGroup.parse(group))));
        return phaseGroups;
    }
    async getSets(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        Logger_1.default.info('Getting Sets for League [%s :: %s]', this.id, this.name);
        Logger_1.default.warn('Puilling Sets for large or massive Leagues may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Sets');
        let pgs = await this.getPhaseGroups();
        let sets = await NetworkInterface_1.default.clusterQuery(pgs, 'getSets', options);
        return lodash_1.default.flatten(sets);
    }
    async getEntrants(options = Entrant_1.IEntrant.getDefaultEntrantOptions()) {
        Logger_1.default.info('Getting Entrants for League [%s :: %s]', this.id, this.name);
        Logger_1.default.warn('Puilling Entrants for large or massive Leagues may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Entrants');
        let pgs = await this.getPhaseGroups();
        let entrants = await NetworkInterface_1.default.clusterQuery(pgs, 'getEntrants', options);
        entrants = lodash_1.default.uniq(entrants);
        return lodash_1.default.flatten(entrants);
    }
    async getAttendees(options = Attendee_1.IAttendee.getDefaultAttendeeOptions()) {
        Logger_1.default.info('Getting Attendees for League [%s :: %s]', this.id, this.name);
        Logger_1.default.warn('Puilling Attendees for large or massive Leagues may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Attendees');
        let pgs = await this.getPhaseGroups();
        let attendees = await NetworkInterface_1.default.clusterQuery(pgs, 'getAttendees', options);
        attendees = lodash_1.default.uniqWith(attendees, (a1, a2) => Attendee_1.Attendee.eq(a1, a2));
        return lodash_1.default.flatten(attendees);
    }
}
exports.League = League;
