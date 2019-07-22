'use strict';
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
const NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
const queries = __importStar(require("./scripts/phaseQueries"));
const PhaseGroup_1 = require("./PhaseGroup"); //TODO change this to internal
const GGSet_1 = require("./GGSet");
const Entrant_1 = require("./Entrant");
const Seed_1 = require("./Seed");
const Attendee_1 = require("./Attendee");
const Logger_1 = __importDefault(require("./util/Logger"));
class Phase {
    constructor(id, eventId, name, numSeeds, groupCount) {
        this.id = id;
        this.eventId = eventId;
        this.name = name;
        this.numSeeds = numSeeds;
        this.groupCount = groupCount;
    }
    static parse(data, eventId = -1) {
        return new Phase(data.id, eventId || -1, data.name, data.numSeeds, data.groupCount);
    }
    static async get(id, eventId) {
        Logger_1.default.info('Getting Phase with id %s and event id %s', id, eventId);
        let data = await NetworkInterface_1.default.query(queries.phase, { id: id });
        return Phase.parse(data.phase, eventId);
    }
    getId() {
        return this.id;
    }
    getEventId() {
        return this.eventId;
    }
    getName() {
        return this.name;
    }
    getNumSeeds() {
        return this.numSeeds;
    }
    getGroupCount() {
        return this.groupCount;
    }
    async getPhaseGroups() {
        Logger_1.default.info('Getting phase groups for phase %s', this.id);
        let data = await NetworkInterface_1.default.query(queries.phasePhaseGroups, { eventId: this.eventId });
        let phaseGroupData = data.event.phaseGroups.filter(phaseGroupData => phaseGroupData.phaseId === this.id);
        let phaseGroups = phaseGroupData.map(pg => PhaseGroup_1.PhaseGroup.parse(pg));
        return phaseGroups;
    }
    async getSeeds(options) {
        Logger_1.default.info('Getting seeds for phase %s', this.id);
        Logger_1.default.verbose('Query variables: %s', JSON.stringify(options));
        let pgs = await this.getPhaseGroups();
        let seeds = await NetworkInterface_1.default.clusterQuery(pgs, 'getSeeds', options);
        return lodash_1.default.flatten(seeds);
    }
    async getEntrants(options = Entrant_1.IEntrant.getDefaultEntrantOptions()) {
        Logger_1.default.info('Getting entrants for phase %s', this.id);
        Logger_1.default.verbose('Query variables: %s', JSON.stringify(options));
        let pgs = await this.getPhaseGroups();
        let entrants = await NetworkInterface_1.default.clusterQuery(pgs, 'getEntrants', options);
        return lodash_1.default.flatten(entrants);
    }
    async getAttendees(options = Attendee_1.IAttendee.getDefaultAttendeeOptions()) {
        Logger_1.default.info('Getting attendees for phase %s', this.id);
        Logger_1.default.verbose('Query variables: %s', JSON.stringify(options));
        let pgs = await this.getPhaseGroups();
        let attendees = await NetworkInterface_1.default.clusterQuery(pgs, 'getAttendees', options);
        return lodash_1.default.flatten(attendees);
    }
    async getSets(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        Logger_1.default.info('Getting sets for phase %s', this.id);
        // get all phase group objects, then promise all over the array pf phpase groups
        // getting their respective sets for time efficiency
        let pgs = await this.getPhaseGroups();
        let pgSets = await NetworkInterface_1.default.clusterQuery(pgs, 'getSets', options);
        return lodash_1.default.flatten(pgSets);
    }
    // alternatives
    async getSeeds2(options) {
        Logger_1.default.info('Getting seeds for phase %s', this.id);
        Logger_1.default.verbose('Query variables: %s', JSON.stringify(options));
        let data = await NetworkInterface_1.default.paginatedQuery(`Phase Seeds [${this.id}]`, queries.phaseSeeds, { id: this.id }, options, {}, 2);
        let seedData = lodash_1.default.flatten(data.map(results => results.phase.paginatedSeeds.nodes)).filter(seed => seed != null);
        let seeds = seedData.map((seedData) => Seed_1.Seed.parse(seedData));
        return seeds;
    }
    async getEntrants2(options = Entrant_1.IEntrant.getDefaultEntrantOptions()) {
        Logger_1.default.info('Getting entrants for phase %s', this.id);
        Logger_1.default.verbose('Query variables: %s', JSON.stringify(options));
        let data = await NetworkInterface_1.default.paginatedQuery(`Phase Entrants [${this.id}]`, queries.phaseEntrants, { id: this.id }, options, {}, 2);
        let entrantData = lodash_1.default.flatten(data.map(entrantData => entrantData.phase.paginatedSeeds.nodes)).filter(entrant => entrant != null);
        let entrants = entrantData.map(e => Entrant_1.Entrant.parseFull(e));
        return entrants;
    }
    async getAttendees2(options = Attendee_1.IAttendee.getDefaultAttendeeOptions()) {
        Logger_1.default.info('Getting attendees for phase %s', this.id);
        Logger_1.default.verbose('Query variables: %s', JSON.stringify(options));
        let data = await NetworkInterface_1.default.paginatedQuery(`Phase Attendees [${this.id}]`, queries.phaseAttendees, { id: this.id }, options, {}, 3);
        let seeds = lodash_1.default.flatten(data.map(seed => seed.phase.paginatedSeeds));
        let nodes = lodash_1.default.flatten(seeds.map(seed => seed.nodes));
        let entrants = nodes.map(node => node.entrant);
        let participants = lodash_1.default.flatten(entrants.map(entrant => entrant.participants)).filter(participant => participant != null);
        let attendees = participants.map(participant => Attendee_1.Attendee.parse(participant));
        return attendees;
    }
    async getIncompleteSets(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        return GGSet_1.GGSet.filterForIncompleteSets(await this.getSets(options));
    }
    async getCompleteSets(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        return GGSet_1.GGSet.filterForCompleteSets(await this.getSets(options));
    }
    async getSetsXMinutesBack(minutesBack, options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        return GGSet_1.GGSet.filterForXMinutesBack(await this.getSets(options), minutesBack);
    }
}
exports.Phase = Phase;
