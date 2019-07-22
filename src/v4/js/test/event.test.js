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
const path_1 = __importDefault(require("path"));
const ROOT = path_1.default.join(__dirname, '..', '..', '..', '..', '.env');
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: ROOT });
require("../lib/util/ErrorHandler");
const lodash_1 = __importDefault(require("lodash"));
const chai_1 = __importDefault(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
chai_1.default.use(chai_as_promised_1.default);
const { expect } = chai_1.default;
const Event_1 = require("../lib/Event");
const Phase_1 = require("../lib/Phase");
const PhaseGroup_1 = require("../lib/PhaseGroup");
const Entrant_1 = require("../lib/Entrant");
const Attendee_1 = require("../lib/Attendee");
const GGSet_1 = require("../lib/GGSet");
const Initializer_1 = __importDefault(require("../lib/util/Initializer"));
const testData = __importStar(require("./data/event.testData"));
let event1, event2, event3;
const EVENT_ID_1 = 133902;
const EVENT_SLUG_1 = 'tournament/21xx-cameron-s-birthday-bash-1/event/melee-singles';
const EVENT_TOURNAMENT_SLUG_1 = '21xx-cameron-s-birthday-bash-1';
const EVENT_EVENT_SLUG_1 = 'melee-singles';
const EVENT_ID_2 = 23597;
const EVENT_SLUG_2 = 'tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/melee-doubles';
const EVENT_TOURNAMENT_SLUG_2 = 'tipped-off-12-presented-by-the-lab-gaming-center';
const EVENT_EVENT_SLUG_2 = 'melee-doubles';
const EVENT_ID_3 = 11787;
const EVENT_SLUG_3 = 'tournament/ceo-2016/event/melee-singles';
const EVENT_TOURNAMENT_SLUG_3 = 'ceo-2016';
const EVENT_EVENT_SLUG_3 = 'melee-singles';
const TOP_8_LABELS = [
    'Losers Quarter-Final', 'Losers Quarter-Final',
    'Losers Semi-Final', 'Losers Semi-Final',
    'Winners Semi-Final', 'Winners Semi-Final',
    'Winners Final', 'Grand Final', 'Losers Final'
];
const GRAND_FINAL_RESET_TOKEN = 'Grand Final Reset';
describe('smashgg Event', function () {
    this.timeout(10000);
    before(async function () {
        this.timeout(20000);
        await Initializer_1.default(process.env.API_TOKEN);
        let ei1 = await Event_1.Event.getById(EVENT_ID_1);
        let ei2 = await Event_1.Event.getById(EVENT_ID_2);
        let ei3 = await Event_1.Event.getById(EVENT_ID_3);
        let es1 = await Event_1.Event.getBySlug(EVENT_SLUG_1);
        let es2 = await Event_1.Event.getBySlug(EVENT_SLUG_2);
        let es3 = await Event_1.Event.getBySlug(EVENT_SLUG_3);
        let e1 = await Event_1.Event.get(EVENT_TOURNAMENT_SLUG_1, EVENT_EVENT_SLUG_1);
        let e2 = await Event_1.Event.get(EVENT_TOURNAMENT_SLUG_2, EVENT_EVENT_SLUG_2);
        let e3 = await Event_1.Event.get(EVENT_TOURNAMENT_SLUG_3, EVENT_EVENT_SLUG_3);
        expect(ei1).to.deep.equal(es1);
        expect(ei2).to.deep.equal(es2);
        expect(ei3).to.deep.equal(es3);
        expect(e1).to.deep.equal(es1);
        expect(e2).to.deep.equal(es2);
        expect(e3).to.deep.equal(es3);
        event1 = ei1;
        event2 = ei2;
        event3 = ei3;
        return true;
    });
    // id
    it('should return the correct event id 1', function () {
        expect(event1.getId()).to.be.equal(testData.event1.id);
    });
    it('should return the correct event id 2', function () {
        expect(event2.getId()).to.be.equal(testData.event2.id);
    });
    it('should return the correct event id 3', function () {
        expect(event3.getId()).to.be.equal(testData.event3.id);
    });
    // name
    it('should return the correct event name 1', function () {
        expect(event1.getName()).to.be.equal(testData.event1.name);
    });
    it('should return the correct event name 2', function () {
        expect(event2.getName()).to.be.equal(testData.event2.name);
    });
    it('should return the correct event name 3', function () {
        expect(event3.getName()).to.be.equal(testData.event3.name);
    });
    // slug
    it('should return the correct event slug 1', function () {
        expect(event1.getSlug()).to.be.equal(testData.event1.slug);
    });
    it('should return the correct event slug 2', function () {
        expect(event2.getSlug()).to.be.equal(testData.event2.slug);
    });
    it('should return the correct event slug 3', function () {
        expect(event3.getSlug()).to.be.equal(testData.event3.slug);
    });
    // state
    it('should return the correct event state 1', function () {
        expect(event1.getState()).to.be.equal(testData.event1.state);
    });
    it('should return the correct event state 2', function () {
        expect(event2.getState()).to.be.equal(testData.event2.state);
    });
    it('should return the correct event state 3', function () {
        expect(event3.getState()).to.be.equal(testData.event3.state);
    });
    // num entrants
    it('should return the correct event number of entrants 1', function () {
        expect(event1.getNumEntrants()).to.be.equal(testData.event1.numEntrants);
    });
    it('should return the correct event number of entrants 2', function () {
        expect(event2.getNumEntrants()).to.be.equal(testData.event2.numEntrants);
    });
    it('should return the correct event number of entrants 3', function () {
        expect(event3.getNumEntrants()).to.be.equal(testData.event3.numEntrants);
    });
    // check in buffer
    it('should return the correct event check in buffer 1', function () {
        expect(event1.getCheckInBuffer()).to.be.equal(testData.event1.checkInBuffer);
    });
    it('should return the correct event check in buffer 2', function () {
        expect(event2.getCheckInBuffer()).to.be.equal(testData.event2.checkInBuffer);
    });
    it('should return the correct event check in buffer 3', function () {
        expect(event3.getCheckInBuffer()).to.be.equal(testData.event3.checkInBuffer);
    });
    // check in duration
    it('should return the correct event check in duration 1', function () {
        expect(event1.getCheckInDuration()).to.be.equal(testData.event1.checkInDuration);
    });
    it('should return the correct event check in duration 2', function () {
        expect(event2.getCheckInDuration()).to.be.equal(testData.event2.checkInDuration);
    });
    it('should return the correct event check in duration 3', function () {
        expect(event3.getCheckInDuration()).to.be.equal(testData.event3.checkInDuration);
    });
    // check in enabled
    it('should return the correct event check in enabled setting 1', function () {
        expect(event1.getCheckInEnabled()).to.be.equal(testData.event1.checkInEnabled);
    });
    it('should return the correct event check in enabled setting 2', function () {
        expect(event2.getCheckInEnabled()).to.be.equal(testData.event2.checkInEnabled);
    });
    it('should return the correct event check in enabled setting 3', function () {
        expect(event3.getCheckInEnabled()).to.be.equal(testData.event3.checkInEnabled);
    });
    // is online
    it('should return the correct event is online setting 1', function () {
        expect(event1.getIsOnline()).to.be.equal(testData.event1.isOnline);
    });
    it('should return the correct event is online setting 2', function () {
        expect(event2.getIsOnline()).to.be.equal(testData.event2.isOnline);
    });
    it('should return the correct event is online setting 3', function () {
        expect(event3.getIsOnline()).to.be.equal(testData.event3.isOnline);
    });
    // team name allowed
    it('should return the correct event team name allowed setting 1', function () {
        expect(event1.getTeamNameAllowed()).to.be.equal(testData.event1.teamNameAllowed);
    });
    it('should return the correct event team name allowed setting 2', function () {
        expect(event2.getTeamNameAllowed()).to.be.equal(testData.event2.teamNameAllowed);
    });
    it('should return the correct event team name allowed setting 3', function () {
        expect(event3.getTeamNameAllowed()).to.be.equal(testData.event3.teamNameAllowed);
    });
    // team management deadline
    it('should return the correct event team management deadline 1', function () {
        expect(event1.getTeamManagementDeadline()).to.be.equal(testData.event1.teamManagementDeadline);
    });
    it('should return the correct event team management deadline 2', function () {
        expect(event2.getTeamManagementDeadline()).to.be.equal(testData.event2.teamManagementDeadline);
    });
    it('should return the correct event team management deadline 3', function () {
        expect(event3.getTeamManagementDeadline()).to.be.equal(testData.event3.teamManagementDeadline);
    });
    // phases
    it('should return the correct list of Phases in the Event 1', async function () {
        this.timeout(30000);
        let phases = await event1.getPhases();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(phases)).to.be.false;
        phases.forEach(phase => {
            expect(phase).to.be.an.instanceof(Phase_1.Phase);
        });
        expect(phases.length).to.be.equal(1);
        return true;
    });
    it('should return the correct list of Phases in the Event 2', async function () {
        this.timeout(30000);
        let phases = await event2.getPhases();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(phases)).to.be.false;
        phases.forEach(phase => {
            expect(phase).to.be.an.instanceof(Phase_1.Phase);
        });
        expect(phases.length).to.be.equal(2);
        return true;
    });
    it('should return the correct list of Phases in the Event 3', async function () {
        this.timeout(30000);
        let phases = await event3.getPhases();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(phases)).to.be.false;
        phases.forEach(phase => {
            expect(phase).to.be.an.instanceof(Phase_1.Phase);
        });
        expect(phases.length).to.be.equal(2);
        return true;
    });
    // phase groups
    it('should return the correct list of Phase Groups in the Event 1', async function () {
        this.timeout(30000);
        let groups = await event1.getPhaseGroups();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(groups)).to.be.false;
        groups.forEach(group => {
            expect(group).to.be.an.instanceof(PhaseGroup_1.PhaseGroup);
        });
        expect(groups.length).to.be.equal(1);
        return true;
    });
    it('should return the correct list of Phase Groups in the Event 2', async function () {
        this.timeout(30000);
        let groups = await event2.getPhaseGroups();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(groups)).to.be.false;
        groups.forEach(group => {
            expect(group).to.be.an.instanceof(PhaseGroup_1.PhaseGroup);
        });
        expect(groups.length).to.be.equal(9);
        return true;
    });
    it('should return the correct list of Phase Groups in the Event 3', async function () {
        this.timeout(30000);
        let groups = await event3.getPhaseGroups();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(groups)).to.be.false;
        groups.forEach(group => {
            expect(group).to.be.an.instanceof(PhaseGroup_1.PhaseGroup);
        });
        expect(groups.length).to.be.equal(33);
        return true;
    });
    // entrants
    it('should return the correct list of Entrants in the Event 1', async function () {
        this.timeout(30000);
        let entrants = await event1.getEntrants();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(entrants)).to.be.false;
        entrants.forEach(entrant => {
            expect(entrant).to.be.an.instanceof(Entrant_1.Entrant);
        });
        expect(entrants.length).to.be.equal(50);
        return true;
    });
    it('should return the correct list of Entrants in the Event 2', async function () {
        this.timeout(30000);
        let entrants = await event2.getEntrants();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(entrants)).to.be.false;
        entrants.forEach(entrant => {
            expect(entrant).to.be.an.instanceof(Entrant_1.Entrant);
        });
        expect(entrants.length).to.be.equal(84);
        return true;
    });
    xit('should return the correct list of Entrants in the Event 3', async function () {
        this.timeout(60000);
        let entrants = await event3.getEntrants();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(entrants)).to.be.false;
        entrants.forEach(entrant => {
            expect(entrant).to.be.an.instanceof(Entrant_1.Entrant);
        });
        expect(entrants.length).to.be.equal(725);
        return true;
    });
    // attendee
    it('should return the correct list of Attendees in the Event 1', async function () {
        this.timeout(30000);
        let attendees = await event1.getAttendees();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(attendees)).to.be.false;
        attendees.forEach(attendee => {
            expect(attendee).to.be.an.instanceof(Attendee_1.Attendee);
        });
        expect(attendees.length).to.be.equal(50);
        return true;
    });
    it('should return the correct list of Attendees in the Event 2', async function () {
        this.timeout(30000);
        let attendees = await event2.getAttendees();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(attendees)).to.be.false;
        attendees.forEach(attendee => {
            expect(attendee).to.be.an.instanceof(Attendee_1.Attendee);
        });
        expect(attendees.length).to.be.equal(168);
        return true;
    });
    xit('should return the correct list of Attendees in the Event 3', async function () {
        this.timeout(60000);
        let attendees = await event3.getAttendees();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(attendees)).to.be.false;
        attendees.forEach(attendee => {
            expect(attendee).to.be.an.instanceof(Attendee_1.Attendee);
        });
        expect(attendees.length).to.be.equal(725);
        return true;
    });
    // sets
    it('should return the correct list of Sets in the Event 1', async function () {
        this.timeout(30000);
        let sets = await event1.getSets();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(sets)).to.be.false;
        sets.forEach(set => {
            expect(set).to.be.an.instanceof(GGSet_1.GGSet);
        });
        expect(sets.length).to.be.equal(84);
        return true;
    });
    it('should return the correct list of Sets in the Event 2', async function () {
        this.timeout(60000);
        let sets = await event2.getSets();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(sets)).to.be.false;
        sets.forEach(set => {
            expect(set).to.be.an.instanceof(GGSet_1.GGSet);
        });
        expect(sets.length).to.be.equal(132);
        return true;
    });
    xit('should return the correct list of Sets in the Event 3', async function () {
        this.timeout(30000);
        let sets = await event3.getSets();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(sets)).to.be.false;
        sets.forEach(set => {
            expect(set).to.be.an.instanceof(GGSet_1.GGSet);
        });
        expect(sets.length).to.be.equal(75);
        return true;
    });
});
