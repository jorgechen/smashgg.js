"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** aka Entrant **/
const Attendee_1 = require("./Attendee"); // TODO later change this to internal
class Entrant {
    constructor(id, name, eventId, skill, attendeeData) {
        this.id = id;
        this.name = name;
        this.eventId = eventId;
        this.skill = skill;
        this.attendeeData = attendeeData;
    }
    static parse(data) {
        let attendeeData = data.participants.map(attendeeData => Attendee_1.Attendee.parse(attendeeData));
        return new Entrant(data.id, data.name, data.eventId, data.skill, attendeeData);
    }
    static parseFull(data) {
        return Entrant.parse(data.entrant);
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEventId() {
        return this.eventId;
    }
    getSkill() {
        return this.skill;
    }
    getAttendeeData() {
        return this.attendeeData;
    }
    getAttendee(position = 0) {
        return this.attendeeData[position];
    }
    getAttendeeId(position = 0) {
        return this.attendeeData[position].getId();
    }
    getGamerTag(position = 0) {
        return this.attendeeData[position].getGamerTag();
    }
    getSponsor(position = 0) {
        return this.attendeeData[position].getSponsor();
    }
    getPhoneNumber(position = 0) {
        return this.attendeeData[position].getPhoneNumber();
    }
    getContactInfo(position = 0) {
        return this.attendeeData[position].getContactInfo();
    }
    getCity(position = 0) {
        return this.attendeeData[position].getCity();
    }
    getState(position = 0) {
        return this.attendeeData[position].getState();
    }
    getStateId(position = 0) {
        return this.attendeeData[position].getStateId();
    }
    getCountry(position = 0) {
        return this.attendeeData[position].getCountry();
    }
    getCountryId(position = 0) {
        return this.attendeeData[position].getCountryId();
    }
    getContactName(position = 0) {
        return this.attendeeData[position].getContactName();
    }
    getFirstName(position = 0) {
        return this.attendeeData[position].getFirstName();
    }
    getLastName(position = 0) {
        return this.attendeeData[position].getLastName();
    }
    getZipcode(position = 0) {
        return this.attendeeData[position].getZipcode();
    }
    getConnectedAccounts(position = 0) {
        return this.attendeeData[position].getConnectedAccounts();
    }
}
exports.Entrant = Entrant;
var IEntrant;
(function (IEntrant) {
    function getDefaultEntrantOptions() {
        return {
            areSeedsPublished: true,
            page: 1,
            perPage: 1,
            sortBy: null,
            filter: null
        };
    }
    IEntrant.getDefaultEntrantOptions = getDefaultEntrantOptions;
})(IEntrant = exports.IEntrant || (exports.IEntrant = {}));
