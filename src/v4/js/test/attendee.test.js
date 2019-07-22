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
const chai_1 = require("chai");
const Attendee_1 = require("../lib/Attendee");
const User_1 = require("../lib/User");
const Phase_1 = require("../lib/Phase");
const PhaseGroup_1 = require("../lib/PhaseGroup");
const Initializer_1 = __importDefault(require("../lib/util/Initializer"));
const testData = __importStar(require("./data/attendee.testData"));
let attendee1, attendee2, attendee3;
describe('smash.gg Attendee (Participant)', function () {
    before(async function () {
        await Initializer_1.default(process.env.API_TOKEN);
        attendee1 = Attendee_1.Attendee.parseFull(testData.attendee1Data);
        attendee2 = Attendee_1.Attendee.parseFull(testData.attendee2Data);
        attendee3 = Attendee_1.Attendee.parseFull(testData.attendee3Data);
        return true;
    });
    // attendee id
    it('should get the correct attendee Attendee (smash.gg Participant) id 1', function () {
        chai_1.expect(attendee1.getId()).to.be.equal(testData.attendee1Data.participant.id);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) id 2', function () {
        chai_1.expect(attendee2.getId()).to.be.equal(testData.attendee2Data.participant.id);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) id 3', function () {
        chai_1.expect(attendee3.getId()).to.be.equal(testData.attendee3Data.participant.id);
    });
    // gamer tag
    it('should get the correct attendee Attendee (smash.gg Participant) gamer tag 1', function () {
        chai_1.expect(attendee1.getGamerTag()).to.be.equal(testData.attendee1Data.participant.gamerTag);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) gamer tag 2', function () {
        chai_1.expect(attendee2.getGamerTag()).to.be.equal(testData.attendee2Data.participant.gamerTag);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) gamer tag 3', function () {
        chai_1.expect(attendee3.getGamerTag()).to.be.equal(testData.attendee3Data.participant.gamerTag);
    });
    // sponsor
    it('should get the correct attendee Attendee (smash.gg Participant) sponsor 1', function () {
        chai_1.expect(attendee1.getSponsor()).to.be.equal(testData.attendee1Data.participant.prefix);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) sponsor 2', function () {
        chai_1.expect(attendee2.getSponsor()).to.be.equal(testData.attendee2Data.participant.prefix);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) sponsor 3', function () {
        chai_1.expect(attendee3.getSponsor()).to.be.equal(testData.attendee3Data.participant.prefix);
    });
    // phone number
    it('should get the correct attendee Attendee (smash.gg Participant) phone number 1', function () {
        chai_1.expect(attendee1.getPhoneNumber()).to.be.equal(testData.attendee1Data.participant.phoneNumber);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) phone number 2', function () {
        chai_1.expect(attendee2.getPhoneNumber()).to.be.equal(testData.attendee2Data.participant.phoneNumber);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) phone number 3', function () {
        chai_1.expect(attendee3.getPhoneNumber()).to.be.equal(testData.attendee3Data.participant.phoneNumber);
    });
    // contact info
    it('should get the correct attendee Attendee (smash.gg Participant) contact info 1', function () {
        chai_1.expect(attendee1.getContactInfo()).to.deep.equal(testData.attendee1Data.participant.contactInfo);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) contact info 2', function () {
        chai_1.expect(attendee1.getContactInfo()).to.deep.equal(testData.attendee1Data.participant.contactInfo);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) contact info 3', function () {
        chai_1.expect(attendee1.getContactInfo()).to.deep.equal(testData.attendee1Data.participant.contactInfo);
    });
    // city
    it('should get the correct attendee Attendee (smash.gg Participant) city 1', function () {
        chai_1.expect(attendee1.getCity()).to.be.equal(testData.attendee1Data.participant.contactInfo.city);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) city 2', function () {
        chai_1.expect(attendee2.getCity()).to.be.equal(testData.attendee2Data.participant.contactInfo.city);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) city 3', function () {
        chai_1.expect(attendee3.getCity()).to.be.equal(testData.attendee3Data.participant.contactInfo.city);
    });
    // state 
    it('should get the correct attendee Attendee (smash.gg Participant) state 1', function () {
        chai_1.expect(attendee1.getState()).to.be.equal(testData.attendee1Data.participant.contactInfo.state);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) state 2', function () {
        chai_1.expect(attendee2.getState()).to.be.equal(testData.attendee2Data.participant.contactInfo.state);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) state 3', function () {
        chai_1.expect(attendee3.getState()).to.be.equal(testData.attendee3Data.participant.contactInfo.state);
    });
    // state id
    it('should get the correct attendee Attendee (smash.gg Participant) state id 1', function () {
        chai_1.expect(attendee1.getStateId()).to.be.equal(testData.attendee1Data.participant.contactInfo.stateId);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) state id 2', function () {
        chai_1.expect(attendee2.getStateId()).to.be.equal(testData.attendee2Data.participant.contactInfo.stateId);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) state id 3', function () {
        chai_1.expect(attendee3.getStateId()).to.be.equal(testData.attendee3Data.participant.contactInfo.stateId);
    });
    // country
    it('should get the correct attendee Attendee (smash.gg Participant) country 1', function () {
        chai_1.expect(attendee1.getCountry()).to.be.equal(testData.attendee1Data.participant.contactInfo.country);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) country 2', function () {
        chai_1.expect(attendee2.getCountry()).to.be.equal(testData.attendee2Data.participant.contactInfo.country);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) country 3', function () {
        chai_1.expect(attendee3.getCountry()).to.be.equal(testData.attendee3Data.participant.contactInfo.country);
    });
    // country id
    it('should get the correct attendee Attendee (smash.gg Participant) country id 1', function () {
        chai_1.expect(attendee1.getStateId()).to.be.equal(testData.attendee1Data.participant.contactInfo.countryId);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) country id 2', function () {
        chai_1.expect(attendee2.getStateId()).to.be.equal(testData.attendee2Data.participant.contactInfo.countryId);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) country id 3', function () {
        chai_1.expect(attendee3.getStateId()).to.be.equal(testData.attendee3Data.participant.contactInfo.countryId);
    });
    // contact name
    it('should get the correct attendee Attendee (smash.gg Participant) contact name 1', function () {
        chai_1.expect(attendee1.getContactName()).to.be.equal(testData.attendee1Data.participant.contactInfo.name);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) contact name 2', function () {
        chai_1.expect(attendee2.getContactName()).to.be.equal(testData.attendee2Data.participant.contactInfo.name);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) contact name 3', function () {
        chai_1.expect(attendee3.getContactName()).to.be.equal(testData.attendee3Data.participant.contactInfo.name);
    });
    // first name
    it('should get the correct attendee Attendee (smash.gg Participant) first name 1', function () {
        chai_1.expect(attendee1.getFirstName()).to.be.equal(testData.attendee1Data.participant.contactInfo.nameFirst);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) first name 2', function () {
        chai_1.expect(attendee2.getFirstName()).to.be.equal(testData.attendee2Data.participant.contactInfo.nameFirst);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) first name 3', function () {
        chai_1.expect(attendee3.getFirstName()).to.be.equal(testData.attendee3Data.participant.contactInfo.nameFirst);
    });
    // last name
    it('should get the correct attendee Attendee (smash.gg Participant) last name 1', function () {
        chai_1.expect(attendee1.getLastName()).to.be.equal(testData.attendee1Data.participant.contactInfo.nameLast);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) last name 2', function () {
        chai_1.expect(attendee2.getLastName()).to.be.equal(testData.attendee2Data.participant.contactInfo.nameLast);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) last name 3', function () {
        chai_1.expect(attendee3.getLastName()).to.be.equal(testData.attendee3Data.participant.contactInfo.nameLast);
    });
    // zipcode
    it('should get the correct attendee Attendee (smash.gg Participant) zipcode 1', function () {
        chai_1.expect(attendee1.getZipcode()).to.be.equal(testData.attendee1Data.participant.contactInfo.zipcode);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) zipcode 2', function () {
        chai_1.expect(attendee2.getZipcode()).to.be.equal(testData.attendee2Data.participant.contactInfo.zipcode);
    });
    it('should get the correct attendee Attendee (smash.gg Participant) zipcode 3', function () {
        chai_1.expect(attendee3.getZipcode()).to.be.equal(testData.attendee3Data.participant.contactInfo.zipcode);
    });
    // events entered
    xit('should get the correct events the attendee entered 1', async function () {
    });
    xit('should get the correct events the attendee entered 1', async function () {
    });
    xit('should get the correct events the attendee entered 1', async function () {
    });
    // user account
    it('should get the correct user account for an attendee 1', async function () {
        this.timeout(5000);
        let actual = await User_1.User.getById(attendee1.getPlayerId());
        chai_1.expect(actual).to.not.be.null;
        chai_1.expect(actual).to.be.instanceof(User_1.User);
        //expect(actual).to.deep.equal(User.parse(testUser.user4))
    });
    it('should get the correct user account for an attendee 2', async function () {
        this.timeout(5000);
        let actual = await User_1.User.getById(attendee2.getPlayerId());
        chai_1.expect(actual).to.not.be.null;
        chai_1.expect(actual).to.be.instanceof(User_1.User);
        //expect(actual).to.deep.equal(User.parse(testUser.user5))
    });
    // phases entered
    it('should get the correct phases an attendee entered 1', async function () {
        this.timeout(5000);
        let actual = await attendee1.getEnteredPhases();
        chai_1.expect(actual.length).to.be.greaterThan(0);
        actual.forEach(data => {
            chai_1.expect(data).to.be.instanceOf(Phase_1.Phase);
        });
    });
    it('should get the correct phases an attendee entered 2', async function () {
        this.timeout(5000);
        let actual = await attendee2.getEnteredPhases();
        chai_1.expect(actual.length).to.be.greaterThan(0);
        actual.forEach(data => {
            chai_1.expect(data).to.be.instanceOf(Phase_1.Phase);
        });
    });
    // phase groups entered
    it('should get the correct phase groups an attendee entered 1', async function () {
        this.timeout(5000);
        let actual = await attendee1.getEnteredPhaseGroups();
        chai_1.expect(actual.length).to.be.greaterThan(0);
        actual.forEach(data => {
            chai_1.expect(data).to.be.instanceOf(PhaseGroup_1.PhaseGroup);
        });
    });
    it('should get the correct phase groups an attendee entered 2', async function () {
        this.timeout(5000);
        let actual = await attendee2.getEnteredPhaseGroups();
        chai_1.expect(actual.length).to.be.greaterThan(0);
        actual.forEach(data => {
            chai_1.expect(data).to.be.instanceOf(PhaseGroup_1.PhaseGroup);
        });
    });
});
