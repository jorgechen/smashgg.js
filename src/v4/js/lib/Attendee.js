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
/** aka Participant **/
const lodash_1 = __importDefault(require("lodash"));
const Logger_1 = __importDefault(require("./util/Logger"));
const User_1 = require("./User"); // TODO change to internal later
const Phase_1 = require("./Phase");
const PhaseGroup_1 = require("./PhaseGroup");
const queries = __importStar(require("./scripts/attendeeQueries"));
const NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
class Attendee {
    constructor(id, gamerTag, prefix, createdAt, claimed, verified, playerId, phoneNumber, connectedAccounts, contactInfo, eventIds) {
        this.id = id;
        this.gamerTag = gamerTag;
        this.prefix = prefix;
        this.createdAt = createdAt;
        this.claimed = claimed;
        this.verified = verified;
        this.playerId = playerId;
        this.phoneNumber = phoneNumber;
        this.contactInfo = contactInfo;
        this.connectedAccounts = connectedAccounts;
        this.eventIds = eventIds;
    }
    static parse(data) {
        let eventIds = data.events.map(event => event.id);
        return new Attendee(data.id, data.gamerTag, data.prefix, data.createdAt, data.claimed, data.verified, data.playerId, data.phoneNumber, data.connectedAccounts, data.contactInfo, eventIds);
    }
    static parseFull(data) {
        return this.parse(data.participant);
    }
    static eq(a1, a2) {
        return a1.gamerTag == a2.gamerTag &&
            a1.prefix == a2.prefix &&
            a1.playerId == a2.playerId;
    }
    getId() {
        return this.id;
    }
    getGamerTag() {
        return this.gamerTag;
    }
    getSponsor() {
        return this.prefix;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getClaimed() {
        return this.claimed;
    }
    getVerified() {
        return this.verified;
    }
    getPlayerId() {
        return this.playerId;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    getContactInfo() {
        return this.contactInfo;
    }
    getCity() {
        if (this.contactInfo)
            return this.contactInfo.city;
        else
            return null;
    }
    getState() {
        if (this.contactInfo)
            return this.contactInfo.state;
        else
            return null;
    }
    getStateId() {
        if (this.contactInfo)
            return this.contactInfo.stateId;
        else
            return null;
    }
    getCountry() {
        if (this.contactInfo)
            return this.contactInfo.country;
        else
            return null;
    }
    getCountryId() {
        if (this.contactInfo)
            return this.contactInfo.countryId;
        else
            return null;
    }
    getContactName() {
        if (this.contactInfo)
            return this.contactInfo.name;
        else
            return null;
    }
    getFirstName() {
        if (this.contactInfo)
            return this.contactInfo.nameFirst;
        else
            return null;
    }
    getLastName() {
        if (this.contactInfo)
            return this.contactInfo.nameLast;
        else
            return null;
    }
    getZipcode() {
        if (this.contactInfo)
            return this.contactInfo.zipcode;
        else
            return null;
    }
    getConnectedAccounts() {
        return this.connectedAccounts;
    }
    /* TODO implement
    async getEvents() : Promise<Event[]> {
        Log.info('Getting Events that Attendee %s (Participant %s) entered', this.gamerTag, this.id);
        return Event.getByIds();
    }
    */
    async getUserAccount() {
        Logger_1.default.info('Getting User account that Attendee %s (Participant %s) entered', this.gamerTag, this.id);
        return await User_1.User.getById(this.playerId);
    }
    async getEnteredPhases() {
        Logger_1.default.info('Getting Phases that Attendee %s (Participant %s) entered', this.gamerTag, this.id);
        const data = await NetworkInterface_1.default.query(queries.getAttendeePhases, { id: this.id });
        const seedData = lodash_1.default.flatten(data.participant.entrants.map(entrant => entrant.seeds));
        const phaseData = lodash_1.default.flatten(seedData.map(seed => seed.phase));
        const phases = phaseData.map(data => Phase_1.Phase.parse(data));
        return phases;
    }
    async getEnteredPhaseGroups() {
        Logger_1.default.info('Getting Phase Groups that Attendee %s (Participant %s) entered', this.gamerTag, this.id);
        const data = await NetworkInterface_1.default.query(queries.getAttendeePhaseGroups, { id: this.id });
        const seedData = lodash_1.default.flatten(data.participant.entrants.map(entrant => entrant.seeds));
        const groupData = lodash_1.default.flatten(seedData.map(seed => seed.phaseGroup));
        const groups = groupData.map(data => PhaseGroup_1.PhaseGroup.parse(data));
        return groups;
    }
}
exports.Attendee = Attendee;
var IAttendee;
(function (IAttendee) {
    function getDefaultAttendeeOptions() {
        return {
            areSeedsPublished: true,
            page: 1,
            perPage: 1,
            sortBy: null,
            filter: null
        };
    }
    IAttendee.getDefaultAttendeeOptions = getDefaultAttendeeOptions;
})(IAttendee = exports.IAttendee || (exports.IAttendee = {}));
