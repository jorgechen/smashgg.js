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
const log = __importStar(require("../lib/util/Logger"));
const lodash_1 = __importDefault(require("lodash"));
const chai_1 = __importDefault(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
chai_1.default.use(chai_as_promised_1.default);
const { expect } = chai_1.default;
const Phase_1 = require("../lib/Phase");
const PhaseGroup_1 = require("../lib/PhaseGroup");
const GGSet_1 = require("../lib/GGSet");
const Entrant_1 = require("../lib/Entrant");
const Attendee_1 = require("../lib/Attendee");
const Initializer_1 = __importDefault(require("../lib/util/Initializer"));
const testData = __importStar(require("./data/phase.testData"));
const LOG_LEVEL = log.levels.DEBUG;
const ID1 = 111483;
const ID2 = 45262;
const ID3 = 100046;
const EVENT_ID_1 = 25545;
const EVENT_ID_2 = 11787;
const EVENT_ID_3 = 23596;
let phase1;
let phase2;
let phase3;
let concurrency = 4;
describe('Smash GG Phase', function () {
    this.timeout(10000);
    before(async () => {
        log.setLogLevel(LOG_LEVEL);
        await Initializer_1.default(process.env.API_TOKEN);
        phase1 = await Phase_1.Phase.get(ID1, EVENT_ID_1);
        phase2 = await Phase_1.Phase.get(ID2, EVENT_ID_2);
        phase3 = await Phase_1.Phase.get(ID3, EVENT_ID_3);
        return;
    });
    // id
    it('should get the correct id of the Phase 1', function () {
        expect(phase1.getId()).to.be.equal(testData.phase1.id);
    });
    it('should get the correct id of the Phase 2', function () {
        expect(phase2.getId()).to.be.equal(testData.phase2.id);
    });
    it('should get the correct id of the Phase 3', function () {
        expect(phase3.getId()).to.be.equal(testData.phase3.id);
    });
    // name
    it('should get the name of the Phase 1', function () {
        expect(phase1.getName()).to.be.equal(testData.phase1.name);
    });
    it('should get the name of the Phase 2', function () {
        expect(phase2.getName()).to.be.equal(testData.phase2.name);
    });
    it('should get the name of the Phase 3', function () {
        expect(phase3.getName()).to.be.equal(testData.phase3.name);
    });
    // event id
    it('should get the event id 1', function () {
        expect(phase1.getEventId()).to.be.equal(EVENT_ID_1);
    });
    it('should get the event id 2', function () {
        expect(phase2.getEventId()).to.be.equal(EVENT_ID_2);
    });
    it('should get the event id 3', function () {
        expect(phase3.getEventId()).to.be.equal(EVENT_ID_3);
    });
    // num seeds
    it('should get the Phase num seeds 1', function () {
        expect(phase1.getNumSeeds()).to.be.equal(testData.phase1.numSeeds);
    });
    it('should get the Phase num seeds 2', function () {
        expect(phase2.getNumSeeds()).to.be.equal(testData.phase2.numSeeds);
    });
    it('should get the Phase num seeds 3', function () {
        expect(phase3.getNumSeeds()).to.be.equal(testData.phase3.numSeeds);
    });
    // group count
    it('should get the Phase group count 1', function () {
        expect(phase1.getGroupCount()).to.be.equal(testData.phase1.groupCount);
    });
    it('should get the Phase group count 2', function () {
        expect(phase2.getGroupCount()).to.be.equal(testData.phase2.groupCount);
    });
    it('should get the Phase group count 3', function () {
        expect(phase3.getGroupCount()).to.be.equal(testData.phase3.groupCount);
    });
    // sets
    it('should correctly get all sets 1', async function () {
        this.timeout(60000);
        let sets = await phase1.getSets();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(sets)).to.be.false;
        sets.forEach(set => {
            expect(set).to.be.an.instanceof(GGSet_1.GGSet);
        });
        expect(sets.length).to.be.equal(388);
        return true;
    });
    xit('should correctly get all sets 2', async function () {
        this.timeout(120000);
        let sets = await phase2.getSets();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(sets)).to.be.false;
        sets.forEach(set => {
            expect(set).to.be.an.instanceof(GGSet_1.GGSet);
        });
        expect(sets.length).to.be.equal(1164);
        return true;
    });
    xit('should correctly get all sets 3', async function () {
        this.timeout(60000);
        let sets = await phase2.getSets();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(sets)).to.be.false;
        sets.forEach(set => {
            expect(set).to.be.an.instanceof(GGSet_1.GGSet);
        });
        expect(sets.length).to.be.equal(1164);
        return true;
    });
    // entrants
    it('should correctly get all entrants 1', async function () {
        this.timeout(60000);
        let entrants = await phase1.getEntrants();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(entrants)).to.be.false;
        entrants.forEach(set => {
            expect(set).to.be.an.instanceof(Entrant_1.Entrant);
        });
        expect(entrants.length).to.be.equal(156);
        return true;
    });
    xit('should correctly get all entrants 2', async function () {
        this.timeout(30000);
        let entrants = await phase2.getEntrants();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(entrants)).to.be.false;
        entrants.forEach(set => {
            expect(set).to.be.an.instanceof(Entrant_1.Entrant);
        });
        expect(entrants.length).to.be.equal(429);
        return true;
    });
    it('should correctly get all entrants 3', async function () {
        this.timeout(30000);
        let entrants = await phase3.getEntrants();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(entrants)).to.be.false;
        entrants.forEach(set => {
            expect(set).to.be.an.instanceof(Entrant_1.Entrant);
        });
        expect(entrants.length).to.be.equal(250);
        return true;
    });
    // attendee
    it('should correctly get all attendees 1', async function () {
        this.timeout(30000);
        let attendee = await phase1.getAttendees();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(attendee)).to.be.false;
        attendee.forEach(set => {
            expect(set).to.be.an.instanceof(Attendee_1.Attendee);
        });
        expect(attendee.length).to.be.equal(175);
        return true;
    });
    xit('should correctly get all attendees 2', async function () {
        this.timeout(30000);
        let attendee = await phase2.getAttendees();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(attendee)).to.be.false;
        attendee.forEach(set => {
            expect(set).to.be.an.instanceof(Attendee_1.Attendee);
        });
        expect(attendee.length).to.be.equal(200);
        return true;
    });
    it('should correctly get all attendees 3', async function () {
        this.timeout(60000);
        let attendee = await phase3.getAttendees();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(attendee)).to.be.false;
        attendee.forEach(set => {
            expect(set).to.be.an.instanceof(Attendee_1.Attendee);
        });
        expect(attendee.length).to.be.equal(226);
        return true;
    });
    // phase groups
    it('should correctly get all phase groups 1', async function () {
        this.timeout(30000);
        let groups = await phase1.getPhaseGroups();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(groups)).to.be.false;
        groups.forEach(set => {
            expect(set).to.be.an.instanceof(PhaseGroup_1.PhaseGroup);
        });
        expect(groups.length).to.be.equal(16);
        return true;
    });
    it('should correctly get all phase groups 2', async function () {
        this.timeout(30000);
        let groups = await phase2.getPhaseGroups();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(groups)).to.be.false;
        groups.forEach(set => {
            expect(set).to.be.an.instanceof(PhaseGroup_1.PhaseGroup);
        });
        expect(groups.length).to.be.equal(32);
        return true;
    });
    it('should correctly get all phase groups 3', async function () {
        this.timeout(30000);
        let groups = await phase3.getPhaseGroups();
        var hasDuplicates = function (a) {
            return lodash_1.default.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(groups)).to.be.false;
        groups.forEach(set => {
            expect(set).to.be.an.instanceof(PhaseGroup_1.PhaseGroup);
        });
        expect(groups.length).to.be.equal(16);
        return true;
    });
    /*
    it('should correctly get all phase groups', async function(){
        this.timeout(45000)

        let phaseGroups1 = await phase1.getPhaseGroups({concurrency: concurrency});

        expect(phaseGroups1.length).to.be.equal(16);

        var hasDuplicates = function(a: Array<PhaseGroup>) {
            return _.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(phaseGroups1)).to.be.false;

        phaseGroups1.forEach(set => {
            expect(set).to.be.an.instanceof(PhaseGroup);
        });

        return true;
    });

    it('should correctly get all phase groups 2', async function(){
        this.timeout(45000);
        
        let phaseGroups2 = await phase2.getPhaseGroups({concurrency: concurrency});

        expect(phaseGroups2.length).to.be.equal(32);

        var hasDuplicates = function(a: Array<PhaseGroup>) {
            return _.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(phaseGroups2)).to.be.false;

        phaseGroups2.forEach(set => {
            expect(set).to.be.an.instanceof(PhaseGroup);
        });

        return true
    })

    it('should correctly get all phase groups 3', async function(){
        this.timeout(45000);
        
        let phaseGroups3 = await phase3.getPhaseGroups({concurrency: concurrency});

        expect(phaseGroups3.length).to.be.equal(16);

        var hasDuplicates = function(a: Array<PhaseGroup>) {
            return _.uniq(a).length !== a.length;
        };
        expect(hasDuplicates(phaseGroups3)).to.be.false;

        phaseGroups3.forEach(set => {
            expect(set).to.be.an.instanceof(PhaseGroup)
        })

        return true;
    })

    it('should correctly get all sets for a phase', async function(){
        this.timeout(30000)

        let sets1 = await phase1.getSets({concurrency: concurrency});

        expect(sets1.length).to.be.equal(248);

        sets1.forEach(set => {
            expect(set).to.be.instanceof(GGSet);
        })

        return true;
    })

    xit('should correctly get all sets for a phase 2', async function(){
        this.timeout(45000);
        
        let sets2 = await phase2.getSets({concurrency: concurrency});

        expect(sets2.length).to.be.equal(1292);

        sets2.forEach(set => {
            expect(set).to.be.instanceof(GGSet);
        })

        return true;
    })

    it('should correctly get all sets for a phase 3', async function(){
        this.timeout(45000);
        
        let sets3 = await phase3.getSets({concurrency: concurrency});

        expect(sets3.length).to.be.equal(450);

        sets3.forEach(set => {
            expect(set).to.be.instanceof(GGSet);
        })

        return true
    })

    it('should correctly get all players for a phase', async function(){
        this.timeout(30000)
        
        let players1 = await phase1.getPlayers({concurrency: concurrency});

        expect(players1.length).to.be.equal(156);

        players1.forEach(set => {
            expect(set).to.be.instanceof(Entrant)
        })

        return true;
    })

    it('should correctly get all players for a phase', async function(){
        this.timeout(30000);
        
        let players2 = await phase2.getPlayers({concurrency: concurrency});

        expect(players2.length).to.be.equal(678);

        players2.forEach(set => {
            expect(set).to.be.instanceof(Entrant)
        })

        return true
    })

    it('should correctly get sets x minutes back', async function(){
        this.timeout(30000)

        let minutesBack = 5;
        let event = await Event.getEventById(phase1.getEventId(), {});
        let eventDate = moment(event.getStartTime() as Date).add(30, 'minutes').toDate();

        let clock = sinon.useFakeTimers(eventDate)
        let sets = await phase1.getSetsXMinutesBack(minutesBack)
        expect(sets.length).to.be.equal(5)
        sets.forEach(set=> {
            expect(set).to.be.instanceof(GGSet);

            let now = moment();
            let then = moment(set.getCompletedAt() as Date);
            let diff = moment.duration(now.diff(then)).minutes();
            expect(diff <= minutesBack && diff >= 0 && set.getIsComplete()).to.be.true;
        })
        clock.restore()
        return true
    })
    */
});
