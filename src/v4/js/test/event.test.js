"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var path_1 = __importDefault(require("path"));
var ROOT = path_1.default.join(__dirname, '..', '..', '..', '..', '.env');
var dotenv_1 = require("dotenv");
dotenv_1.config({ path: ROOT });
require("../lib/util/ErrorHandler");
var lodash_1 = __importDefault(require("lodash"));
var chai_1 = __importDefault(require("chai"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
chai_1.default.use(chai_as_promised_1.default);
var expect = chai_1.default.expect;
var Event_1 = require("../lib/Event");
var Phase_1 = require("../lib/Phase");
var PhaseGroup_1 = require("../lib/PhaseGroup");
var Entrant_1 = require("../lib/Entrant");
var Attendee_1 = require("../lib/Attendee");
var GGSet_1 = require("../lib/GGSet");
var Initializer_1 = __importDefault(require("../lib/util/Initializer"));
var testData = __importStar(require("./data/event.testData"));
var event1, event2, event3;
var EVENT_ID_1 = 133902;
var EVENT_SLUG_1 = 'tournament/21xx-cameron-s-birthday-bash-1/event/melee-singles';
var EVENT_TOURNAMENT_SLUG_1 = '21xx-cameron-s-birthday-bash-1';
var EVENT_EVENT_SLUG_1 = 'melee-singles';
var EVENT_ID_2 = 23597;
var EVENT_SLUG_2 = 'tournament/tipped-off-12-presented-by-the-lab-gaming-center/event/melee-doubles';
var EVENT_TOURNAMENT_SLUG_2 = 'tipped-off-12-presented-by-the-lab-gaming-center';
var EVENT_EVENT_SLUG_2 = 'melee-doubles';
var EVENT_ID_3 = 11787;
var EVENT_SLUG_3 = 'tournament/ceo-2016/event/melee-singles';
var EVENT_TOURNAMENT_SLUG_3 = 'ceo-2016';
var EVENT_EVENT_SLUG_3 = 'melee-singles';
var TOP_8_LABELS = [
    'Losers Quarter-Final', 'Losers Quarter-Final',
    'Losers Semi-Final', 'Losers Semi-Final',
    'Winners Semi-Final', 'Winners Semi-Final',
    'Winners Final', 'Grand Final', 'Losers Final'
];
var GRAND_FINAL_RESET_TOKEN = 'Grand Final Reset';
describe('smashgg Event', function () {
    this.timeout(10000);
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            var ei1, ei2, ei3, es1, es2, es3, e1, e2, e3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        return [4 /*yield*/, Initializer_1.default(process.env.API_TOKEN)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Event_1.Event.getById(EVENT_ID_1)];
                    case 2:
                        ei1 = _a.sent();
                        return [4 /*yield*/, Event_1.Event.getById(EVENT_ID_2)];
                    case 3:
                        ei2 = _a.sent();
                        return [4 /*yield*/, Event_1.Event.getById(EVENT_ID_3)];
                    case 4:
                        ei3 = _a.sent();
                        return [4 /*yield*/, Event_1.Event.getBySlug(EVENT_SLUG_1)];
                    case 5:
                        es1 = _a.sent();
                        return [4 /*yield*/, Event_1.Event.getBySlug(EVENT_SLUG_2)];
                    case 6:
                        es2 = _a.sent();
                        return [4 /*yield*/, Event_1.Event.getBySlug(EVENT_SLUG_3)];
                    case 7:
                        es3 = _a.sent();
                        return [4 /*yield*/, Event_1.Event.get(EVENT_TOURNAMENT_SLUG_1, EVENT_EVENT_SLUG_1)];
                    case 8:
                        e1 = _a.sent();
                        return [4 /*yield*/, Event_1.Event.get(EVENT_TOURNAMENT_SLUG_2, EVENT_EVENT_SLUG_2)];
                    case 9:
                        e2 = _a.sent();
                        return [4 /*yield*/, Event_1.Event.get(EVENT_TOURNAMENT_SLUG_3, EVENT_EVENT_SLUG_3)];
                    case 10:
                        e3 = _a.sent();
                        expect(ei1).to.deep.equal(es1);
                        expect(ei2).to.deep.equal(es2);
                        expect(ei3).to.deep.equal(es3);
                        expect(e1).to.deep.equal(es1);
                        expect(e2).to.deep.equal(es2);
                        expect(e3).to.deep.equal(es3);
                        event1 = ei1;
                        event2 = ei2;
                        event3 = ei3;
                        return [2 /*return*/, true];
                }
            });
        });
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
    it('should return the correct list of Phases in the Event 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            var phases, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event1.getPhases()];
                    case 1:
                        phases = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(phases)).to.be.false;
                        phases.forEach(function (phase) {
                            expect(phase).to.be.an.instanceof(Phase_1.Phase);
                        });
                        expect(phases.length).to.be.equal(1);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct list of Phases in the Event 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            var phases, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event2.getPhases()];
                    case 1:
                        phases = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(phases)).to.be.false;
                        phases.forEach(function (phase) {
                            expect(phase).to.be.an.instanceof(Phase_1.Phase);
                        });
                        expect(phases.length).to.be.equal(2);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct list of Phases in the Event 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            var phases, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event3.getPhases()];
                    case 1:
                        phases = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(phases)).to.be.false;
                        phases.forEach(function (phase) {
                            expect(phase).to.be.an.instanceof(Phase_1.Phase);
                        });
                        expect(phases.length).to.be.equal(2);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // phase groups
    it('should return the correct list of Phase Groups in the Event 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            var groups, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event1.getPhaseGroups()];
                    case 1:
                        groups = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(groups)).to.be.false;
                        groups.forEach(function (group) {
                            expect(group).to.be.an.instanceof(PhaseGroup_1.PhaseGroup);
                        });
                        expect(groups.length).to.be.equal(1);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct list of Phase Groups in the Event 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            var groups, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event2.getPhaseGroups()];
                    case 1:
                        groups = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(groups)).to.be.false;
                        groups.forEach(function (group) {
                            expect(group).to.be.an.instanceof(PhaseGroup_1.PhaseGroup);
                        });
                        expect(groups.length).to.be.equal(9);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct list of Phase Groups in the Event 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            var groups, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event3.getPhaseGroups()];
                    case 1:
                        groups = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(groups)).to.be.false;
                        groups.forEach(function (group) {
                            expect(group).to.be.an.instanceof(PhaseGroup_1.PhaseGroup);
                        });
                        expect(groups.length).to.be.equal(33);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // entrants
    it('should return the correct list of Entrants in the Event 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            var entrants, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event1.getEntrants()];
                    case 1:
                        entrants = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(entrants)).to.be.false;
                        entrants.forEach(function (entrant) {
                            expect(entrant).to.be.an.instanceof(Entrant_1.Entrant);
                        });
                        expect(entrants.length).to.be.equal(50);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct list of Entrants in the Event 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            var entrants, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event2.getEntrants()];
                    case 1:
                        entrants = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(entrants)).to.be.false;
                        entrants.forEach(function (entrant) {
                            expect(entrant).to.be.an.instanceof(Entrant_1.Entrant);
                        });
                        expect(entrants.length).to.be.equal(84);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    xit('should return the correct list of Entrants in the Event 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            var entrants, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        return [4 /*yield*/, event3.getEntrants()];
                    case 1:
                        entrants = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(entrants)).to.be.false;
                        entrants.forEach(function (entrant) {
                            expect(entrant).to.be.an.instanceof(Entrant_1.Entrant);
                        });
                        expect(entrants.length).to.be.equal(725);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // attendee
    it('should return the correct list of Attendees in the Event 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            var attendees, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event1.getAttendees()];
                    case 1:
                        attendees = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(attendees)).to.be.false;
                        attendees.forEach(function (attendee) {
                            expect(attendee).to.be.an.instanceof(Attendee_1.Attendee);
                        });
                        expect(attendees.length).to.be.equal(50);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct list of Attendees in the Event 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            var attendees, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event2.getAttendees()];
                    case 1:
                        attendees = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(attendees)).to.be.false;
                        attendees.forEach(function (attendee) {
                            expect(attendee).to.be.an.instanceof(Attendee_1.Attendee);
                        });
                        expect(attendees.length).to.be.equal(168);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    xit('should return the correct list of Attendees in the Event 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            var attendees, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        return [4 /*yield*/, event3.getAttendees()];
                    case 1:
                        attendees = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(attendees)).to.be.false;
                        attendees.forEach(function (attendee) {
                            expect(attendee).to.be.an.instanceof(Attendee_1.Attendee);
                        });
                        expect(attendees.length).to.be.equal(725);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // sets
    it('should return the correct list of Sets in the Event 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            var sets, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event1.getSets()];
                    case 1:
                        sets = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(sets)).to.be.false;
                        sets.forEach(function (set) {
                            expect(set).to.be.an.instanceof(GGSet_1.GGSet);
                        });
                        expect(sets.length).to.be.equal(84);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct list of Sets in the Event 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            var sets, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        return [4 /*yield*/, event2.getSets()];
                    case 1:
                        sets = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(sets)).to.be.false;
                        sets.forEach(function (set) {
                            expect(set).to.be.an.instanceof(GGSet_1.GGSet);
                        });
                        expect(sets.length).to.be.equal(132);
                        return [2 /*return*/, true];
                }
            });
        });
    });
    xit('should return the correct list of Sets in the Event 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            var sets, hasDuplicates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, event3.getSets()];
                    case 1:
                        sets = _a.sent();
                        hasDuplicates = function (a) {
                            return lodash_1.default.uniq(a).length !== a.length;
                        };
                        expect(hasDuplicates(sets)).to.be.false;
                        sets.forEach(function (set) {
                            expect(set).to.be.an.instanceof(GGSet_1.GGSet);
                        });
                        expect(sets.length).to.be.equal(75);
                        return [2 /*return*/, true];
                }
            });
        });
    });
});
