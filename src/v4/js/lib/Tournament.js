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
const moment_1 = __importDefault(require("moment"));
const Logger_1 = __importDefault(require("./util/Logger"));
const Venue_1 = require("./Venue");
const Oraganizer_1 = require("./Oraganizer");
const Event_1 = require("./Event");
const Phase_1 = require("./Phase");
const PhaseGroup_1 = require("./PhaseGroup");
const Entrant_1 = require("./Entrant");
const Attendee_1 = require("./Attendee");
const GGSet_1 = require("./GGSet");
const NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
const queries = __importStar(require("./scripts/tournamentQueries"));
class Tournament {
    constructor(id, name, slug, startTime, endTime, timezone, venue, organizer) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.startTime = startTime;
        this.endTime = endTime;
        this.timezone = timezone;
        this.venue = venue;
        this.organizer = organizer;
    }
    static parse(data) {
        let startTimeDate = data.startAt ? moment_1.default.unix(data.startAt).toDate() : null;
        let endTimeDate = data.endAt ? moment_1.default.unix(data.endAt).toDate() : null;
        let venue = new Venue_1.Venue(data.venueName, data.venueAddress, data.city, data.addrState, data.countryCode, data.region, data.postalCode, data.lat, data.lng);
        let organizer = new Oraganizer_1.Organizer(data.ownerId, data.contactEmail, data.contactPhone, data.contactTwitter, data.contactInfo);
        return new Tournament(data.id, data.name, data.slug, startTimeDate, endTimeDate, data.timezone, venue, organizer);
    }
    static parseFull(data) {
        return Tournament.parse(data.tournament);
    }
    static async getById(id) {
        Logger_1.default.info('Getting Tournament with id %s', id);
        let data = await NetworkInterface_1.default.query(queries.tournament, { id: id });
        return Tournament.parseFull(data);
    }
    static async get(slug) {
        Logger_1.default.info('Getting Tournament with slug "%s"', slug);
        let data = await NetworkInterface_1.default.query(queries.tournamentBySlug, { slug: slug });
        return Tournament.parseFull(data);
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
    getTimezone() {
        return this.timezone;
    }
    getStartTime() {
        return this.startTime;
    }
    getStartTimeString() {
        return String(this.startTime);
    }
    getEndTime() {
        return this.endTime;
    }
    getEndTimeString() {
        return String(this.endTime);
    }
    getVenue() {
        return this.venue;
    }
    getVenueName() {
        return this.venue.getName();
    }
    getCity() {
        return this.venue.getCity();
    }
    getState() {
        return this.venue.getState();
    }
    getAddress() {
        return this.venue.getAddress();
    }
    getZipCode() {
        return this.venue.getPostalCode();
    }
    getOrganizer() {
        return this.organizer;
    }
    getContactInfo() {
        return this.organizer.getInfo();
    }
    getContactEmail() {
        return this.organizer.getEmail();
    }
    getContactTwitter() {
        return this.organizer.getTwitter();
    }
    getOwnerId() {
        return this.organizer.getId();
    }
    async getEvents() {
        Logger_1.default.info('Getting Events for Tournament [%s :: %s]', this.id, this.name);
        let data = await NetworkInterface_1.default.query(queries.tournamentEvents, { id: this.id });
        let events = data.tournament.events.map(event => Event_1.Event.parse(event));
        return events;
    }
    async getPhases() {
        Logger_1.default.info('Getting Phases for Tournament [%s :: %s]', this.id, this.name);
        let data = await NetworkInterface_1.default.query(queries.tournamentPhases, { id: this.id });
        let events = data.tournament.events;
        let phases = lodash_1.default.flatten(events.map(event => event.phases.map(phase => Phase_1.Phase.parse(phase, event.id))));
        return phases;
    }
    async getPhaseGroups() {
        Logger_1.default.info('Getting Phase Groups for Tournament [%s :: %s]', this.id, this.name);
        let data = await NetworkInterface_1.default.query(queries.tournamentPhaseGroups, { id: this.id });
        let events = data.tournament.events;
        let phaseGroups = lodash_1.default.flatten(events.map(event => event.phaseGroups.map(group => PhaseGroup_1.PhaseGroup.parse(group))));
        return phaseGroups;
    }
    async getSets(options = GGSet_1.IGGSet.getDefaultSetOptions()) {
        Logger_1.default.info('Getting Sets for Tournament [%s :: %s]', this.id, this.name);
        Logger_1.default.warn('Puilling Sets for large or massive Tournaments may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Sets');
        let pgs = await this.getPhaseGroups();
        let sets = await NetworkInterface_1.default.clusterQuery(pgs, 'getSets', options);
        return lodash_1.default.flatten(sets);
    }
    async getEntrants(options = Entrant_1.IEntrant.getDefaultEntrantOptions()) {
        Logger_1.default.info('Getting Entrants for Tournament [%s :: %s]', this.id, this.name);
        Logger_1.default.warn('Puilling Entrants for large or massive Tournaments may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Entrants');
        let pgs = await this.getPhaseGroups();
        let entrants = await NetworkInterface_1.default.clusterQuery(pgs, 'getEntrants', options);
        entrants = lodash_1.default.uniq(entrants);
        return lodash_1.default.flatten(entrants);
    }
    async getAttendees(options = Attendee_1.IAttendee.getDefaultAttendeeOptions()) {
        Logger_1.default.info('Getting Attendees for Tournament [%s :: %s]', this.id, this.name);
        Logger_1.default.warn('Puilling Attendees for large or massive Tournaments may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Attendees');
        let pgs = await this.getPhaseGroups();
        let attendees = await NetworkInterface_1.default.clusterQuery(pgs, 'getAttendees', options);
        attendees = lodash_1.default.uniqWith(attendees, (a1, a2) => Attendee_1.Attendee.eq(a1, a2));
        return lodash_1.default.flatten(attendees);
    }
    async searchAttendees(smashtag) {
        Logger_1.default.info('Searching Tournament [%s :: %s] with smashtag: %s', this.id, this.name, smashtag);
        const results = await NetworkInterface_1.default.query(queries.tournamentAttendeeSearch, { id: this.id, smashtag: smashtag });
        try {
            const nodes = results.tournament.participants.nodes;
            if (nodes.length == 0)
                return null;
            const matchingAttendees = nodes.map((element) => Attendee_1.Attendee.parse(element));
            return matchingAttendees;
        }
        catch {
            return null; // bad parse, no attendee
        }
    }
    async searchAttendeesBySponsorTag(sponsorTag) {
        Logger_1.default.info('Searching Tournament [%s :: %s] with smashtag: %s', this.id, this.name, sponsorTag);
        const results = await NetworkInterface_1.default.query(queries.tournamentAttendeeSearchByPrefix, { id: this.id, sponsor: sponsorTag.toLowerCase() });
        try {
            const nodes = results.tournament.participants.nodes;
            if (nodes.length == 0)
                return null;
            const matchingAttendees = nodes.map((element) => Attendee_1.Attendee.parse(element));
            return matchingAttendees;
        }
        catch {
            return null; // bad parse, no attendee
        }
    }
}
exports.Tournament = Tournament;
