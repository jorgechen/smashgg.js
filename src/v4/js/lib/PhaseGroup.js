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
const Attendee_1 = require("./Attendee");
const Entrant_1 = require("./Entrant"); // TODO change this to internal
const GGSet_1 = require("./GGSet");
const Seed_1 = require("./Seed");
const NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
const Logger_1 = __importDefault(require("./util/Logger"));
const queries = __importStar(require("./scripts/phaseGroupQueries"));
class PhaseGroup {
    constructor(id, phaseId, displayIdentifier, firstRoundTime, state, waveId, tiebreakOrder) {
        this.id = id;
        this.phaseId = phaseId;
        this.displayIdentifier = displayIdentifier;
        this.firstRoundTime = firstRoundTime;
        this.state = state;
        this.waveId = waveId;
        this.tiebreakOrder = tiebreakOrder;
    }
    static parse(data) {
        return new PhaseGroup(data.id, data.phaseId, data.displayIdentifier, data.firstRoundTime, data.state, data.waveId, data.tiebreakOrder);
    }
    static parseFull(data) {
        return PhaseGroup.parse(data.phaseGroup);
    }
    static parseEventData(data) {
        return data.event.phaseGroups.map(pg => PhaseGroup.parse(pg));
    }
    static async get(id) {
        Logger_1.default.info('Getting Phase Group with id %s', id);
        let data = await NetworkInterface_1.default.query(queries.phaseGroup, { id: id });
        return PhaseGroup.parse(data.phaseGroup);
    }
    getId() {
        return this.id;
    }
    getPhaseId() {
        return this.phaseId;
    }
    getDisplayIdentifier() {
        return this.displayIdentifier;
    }
    getFirstRoundTime() {
        return this.firstRoundTime;
    }
    getState() {
        return this.state;
    }
    getWaveId() {
        return this.waveId;
    }
    getTiebreakOrder() {
        return this.tiebreakOrder;
    }
    async getSeeds(options = Seed_1.ISeed.getDefaultSeedOptions()) {
        Logger_1.default.info('Getting Seeds for Phase Group [%s]', this.id);
        Logger_1.default.verbose('Query variables: %s', JSON.stringify(options));
        let data = await NetworkInterface_1.default.paginatedQuery(`Phase Group Seeds [${this.id}]`, queries.phaseGroupSeeds, { id: this.id }, options, {}, 2);
        let phaseGroups = lodash_1.default.flatten(data.map(pg => pg.phaseGroup));
        let seedData = lodash_1.default.flatten(phaseGroups.map(pg => pg.paginatedSeeds.nodes));
        let seeds = seedData.map(seed => Seed_1.Seed.parse(seed));
        return seeds;
    }
    async getEntrants(options = Entrant_1.IEntrant.getDefaultEntrantOptions()) {
        Logger_1.default.info('Getting Entrants for Phase Group [%s]', this.id);
        Logger_1.default.verbose('Query variables: %s', JSON.stringify(options));
        let data = await NetworkInterface_1.default.paginatedQuery(`Phase Group Entrants [${this.id}]`, queries.phaseGroupEntrants, { id: this.id }, options, {}, 2);
        let phaseGroups = data.map(pg => pg.phaseGroup);
        let entrants = lodash_1.default.flatten(phaseGroups.map(pg => pg.paginatedSeeds.nodes.map(e => Entrant_1.Entrant.parseFull(e)).filter(seed => seed != null)));
        return entrants;
    }
    async getAttendees(options = Attendee_1.IAttendee.getDefaultAttendeeOptions()) {
        Logger_1.default.info('Getting Attendees for Phase Group [%s]', this.id);
        Logger_1.default.verbose('Query variables: %s', JSON.stringify(options));
        let data = await NetworkInterface_1.default.paginatedQuery(`Phase Group Attendees [${this.id}]`, queries.phaseGroupAttendees, { id: this.id }, options, {}, 2);
        let seeds = lodash_1.default.flatten(data.map(entrant => entrant.phaseGroup.paginatedSeeds.nodes));
        let entrants = seeds.map(seed => seed.entrant).filter(entrant => entrant != null);
        let attendeeData = lodash_1.default.flatten(entrants.map(entrant => entrant.participants));
        let attendees = attendeeData.map(a => Attendee_1.Attendee.parse(a));
        return attendees;
    }
    async getSets(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        Logger_1.default.info('Getting Sets for Phase Group [%s]', this.id);
        Logger_1.default.verbose('Query variables: %s', JSON.stringify(options));
        let data = await NetworkInterface_1.default.paginatedQuery(`Phase Group Sets [${this.id}]`, queries.phaseGroupSets, { id: this.id }, options, {}, 2);
        let phaseGroups = data.map(pg => pg.phaseGroup);
        let sets = lodash_1.default.flatten(phaseGroups.map(pg => pg.paginatedSets.nodes.map(set => GGSet_1.GGSet.parse(set)).filter(set => set != null)));
        // optional filters
        if (options.filterByes)
            sets = GGSet_1.GGSet.filterOutDQs(sets);
        if (options.filterResets)
            sets = GGSet_1.GGSet.filterOutResets(sets);
        if (options.filterByes)
            sets = GGSet_1.GGSet.filterOutByes(sets);
        return sets;
    }
    async getCompleteSets(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        Logger_1.default.info('Getting Completed sets for Phase Group [%s]', this.id);
        let sets = await this.getSets(options);
        return GGSet_1.GGSet.filterForCompleteSets(sets);
    }
    async getIncompleteSets(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        Logger_1.default.info('Getting Incompleted sets for Phase Group [%s]', this.id);
        let sets = await this.getSets(options);
        return GGSet_1.GGSet.filterForIncompleteSets(sets);
    }
    async getSetsXMinutesBack(minutes, options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        Logger_1.default.info('Getting sets completed %s minutes ago for Phase Group [%s]', minutes, this.id);
        let sets = await this.getSets(options);
        return GGSet_1.GGSet.filterForXMinutesBack(sets, minutes);
    }
}
exports.PhaseGroup = PhaseGroup;
