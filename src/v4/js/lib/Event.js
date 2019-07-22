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
const util_1 = require("util");
const events_1 = require("events");
const Logger_1 = __importDefault(require("./util/Logger"));
const Phase_1 = require("./Phase");
const PhaseGroup_1 = require("./PhaseGroup");
const GGSet_1 = require("./GGSet");
const Entrant_1 = require("./Entrant");
const Attendee_1 = require("./Attendee");
const NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
const queries = __importStar(require("./scripts/eventQueries"));
const Standing_1 = require("./Standing");
class Event extends events_1.EventEmitter {
    constructor(id, name, slug, state, startAt, numEntrants, checkInBuffer, checkInDuration, checkInEnabled, isOnline, teamNameAllowed, teamManagementDeadline) {
        super();
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.state = state;
        this.startAt = startAt;
        this.numEntrants = numEntrants;
        this.checkInBuffer = checkInBuffer;
        this.checkInDuration = checkInDuration;
        this.checkInEnabled = checkInEnabled;
        this.isOnline = isOnline;
        this.teamNameAllowed = teamNameAllowed;
        this.teamManagementDeadline = teamManagementDeadline;
    }
    static parse(data) {
        return new Event(data.id, data.name, data.slug, data.state, data.startAt, data.numEntrants, data.checkInBuffer, data.checkInDuration, data.checkInEnabled, data.isOnline, data.teamNameAllowed, data.teamManagementDeadline);
    }
    static parseFull(data) {
        return Event.parse(data.event);
    }
    static async get(tournamentSlug, eventSlug) {
        Logger_1.default.info('Getting Event with tournament slug %s and event slug %s', tournamentSlug, eventSlug);
        let slug = util_1.format('tournament/%s/event/%s', tournamentSlug, eventSlug);
        return Event.getBySlug(slug);
    }
    static async getById(id) {
        Logger_1.default.info('Getting Event with id %s', id);
        let data = await NetworkInterface_1.default.query(queries.event, { id: id });
        return Event.parseFull(data);
    }
    static async getBySlug(slug) {
        Logger_1.default.info('Getting Event with slug "%s"', slug);
        let data = await NetworkInterface_1.default.query(queries.eventSlug, { slug: slug });
        return Event.parseFull(data);
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
    getState() {
        return this.state;
    }
    getNumEntrants() {
        return this.numEntrants;
    }
    getCheckInBuffer() {
        return this.checkInBuffer;
    }
    getCheckInDuration() {
        return this.checkInDuration;
    }
    getCheckInEnabled() {
        return this.checkInEnabled;
    }
    getIsOnline() {
        return this.isOnline;
    }
    getTeamNameAllowed() {
        return this.teamNameAllowed;
    }
    getTeamManagementDeadline() {
        return this.teamManagementDeadline;
    }
    // aggregation
    async getStandingsRaw() {
        const { id, name } = this;
        Logger_1.default.info('Getting Standings for Event [%s :: %s]', id, name);
        const options = { page: 1 };
        let data = await NetworkInterface_1.default.paginatedQuery(`Event Entrants [${id} :: ${name}]`, queries.eventStandings, { id }, options, {}, 2);
        // return data
        let standingData = lodash_1.default.flatten(data.map(d => d.event.standings.nodes));
        return standingData;
    }
    async getStandings() {
        const { id } = this;
        const standingData = await this.getStandingsRaw();
        const standings = standingData.map(item => Standing_1.Standing.parse(item, id));
        return standings;
    }
    async getTournamentRaw() {
        const { id } = this;
        const data = await NetworkInterface_1.default.query(queries.eventTournament, { id });
        return data.event.tournament;
    }
    async getPhases() {
        Logger_1.default.info('Getting Phases for Event [%s :: %s]', this.id, this.name);
        let data = await NetworkInterface_1.default.query(queries.eventPhases, { id: this.id });
        return data.event.phases.map(phaseData => Phase_1.Phase.parse(phaseData, this.id));
    }
    async getPhaseGroups() {
        Logger_1.default.info('Getting Phase Groups for Event [%s :: %s]', this.id, this.name);
        let data = await NetworkInterface_1.default.query(queries.eventPhaseGroups, { id: this.id });
        return data.event.phaseGroups.map(phaseGroupData => PhaseGroup_1.PhaseGroup.parse(phaseGroupData));
    }
    async getEntrants(options = Entrant_1.IEntrant.getDefaultEntrantOptions()) {
        Logger_1.default.info('Getting Entrants for Event [%s :: %s]', this.id, this.name);
        if (!options.areSeedsPublished)
            return this.getEntrants2(options);
        let pgs = await this.getPhaseGroups();
        let entrants = await NetworkInterface_1.default.clusterQuery(pgs, 'getEntrants', options);
        return lodash_1.default.flatten(entrants);
    }
    async getAttendees(options = Attendee_1.IAttendee.getDefaultAttendeeOptions()) {
        Logger_1.default.info('Getting Attendees for Event [%s :: %s]', this.id, this.name);
        if (!options.areSeedsPublished)
            return this.getAttendees2(options);
        let pgs = await this.getPhaseGroups();
        let attendees = await NetworkInterface_1.default.clusterQuery(pgs, "getAttendees", options);
        if (options.isVerified)
            attendees = attendees.filter(attendee => attendee.getVerified());
        return lodash_1.default.flatten(attendees);
    }
    async getSets(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        Logger_1.default.info('Getting Sets for Event [%s :: %s]', this.id, this.name);
        let pgs = await this.getPhaseGroups();
        let sets = await NetworkInterface_1.default.clusterQuery(pgs, 'getSets', options);
        return lodash_1.default.flatten(sets);
    }
    async getEntrants2(options = Entrant_1.IEntrant.getDefaultEntrantOptions()) {
        Logger_1.default.info('Getting Entrants for Event [%s :: %s]', this.id, this.name);
        let data = await NetworkInterface_1.default.paginatedQuery(`Event Entrants [${this.id} :: ${this.name}]`, queries.eventEntrants, { id: this.id }, options, {}, 2);
        let entrantData = lodash_1.default.flatten(data.map(d => d.event.entrants.nodes));
        let entrants = entrantData.map(entrant => Entrant_1.Entrant.parse(entrant));
        return entrants;
    }
    async getAttendees2(options = Attendee_1.IAttendee.getDefaultAttendeeOptions()) {
        Logger_1.default.info('Getting Attendees for Event [%s :: %s]', this.id, this.name);
        let data = await NetworkInterface_1.default.paginatedQuery(`Event Attendees [${this.id} :: ${this.name}]`, queries.eventAttendees, { id: this.id }, options, {}, 3);
        let attendeeData = lodash_1.default.flatten(data.map(d => d.event.tournament.participants.nodes));
        let attendees = attendeeData.map(attendee => Attendee_1.Attendee.parse(attendee));
        if (options.isVerified)
            attendees = attendees.filter(attendee => attendee.getVerified());
        return attendees;
    }
    async getSets2(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        const { id, name } = this;
        Logger_1.default.info('Getting Sets for Event [%s :: %s]', id, name);
        let data = await NetworkInterface_1.default.paginatedQuery(`Event Sets [${id} :: ${name}]`, queries.eventSets, { id }, options, {}, 3);
        let setData = lodash_1.default.flatten(data.map(d => d.event.sets.nodes));
        let sets = setData.map(set => GGSet_1.GGSet.parse(set));
        return sets;
    }
    async getSetsRaw(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        const { id, name } = this;
        Logger_1.default.info('Getting Sets for Event [%s :: %s]', id, name);
        let data = await NetworkInterface_1.default.paginatedQuery(`Event Sets [${id} :: ${name}]`, queries.eventSetsRaw, { id }, options, {}, 3);
        let setData = lodash_1.default.flatten(data.map(d => d.event.sets.nodes));
        return setData;
    }
    // need coverage
    async getIncompleteSets(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        Logger_1.default.info('Getting Incomplete Sets for Event [%s :: %s]', this.id, this.name);
        let sets = await this.getSets(options);
        return GGSet_1.GGSet.filterForIncompleteSets(sets);
    }
    // need coverage
    async getCompleteSets(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        Logger_1.default.info('Getting Completed Sets for Event [%s :: %s]', this.id, this.name);
        let sets = await this.getSets(options);
        return GGSet_1.GGSet.filterForCompleteSets(sets);
    }
    // need coverage
    async getSetsXMinutesBack(minutes, options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        Logger_1.default.info('Getting sets completed %s minutes ago for Event [%s :: %s]', minutes, this.id, this.name);
        let sets = await this.getSets(options);
        return GGSet_1.GGSet.filterForXMinutesBack(sets, minutes);
    }
}
exports.Event = Event;
