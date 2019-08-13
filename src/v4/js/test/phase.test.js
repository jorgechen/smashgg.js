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
var log = __importStar(require("../lib/util/Logger"));
var chai_1 = __importDefault(require("chai"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
chai_1.default.use(chai_as_promised_1.default);
var expect = chai_1.default.expect;
var Phase_1 = require("../lib/models/Phase");
var PhaseGroup_1 = require("../lib/models/PhaseGroup");
var GGSet_1 = require("../lib/models/GGSet");
var Entrant_1 = require("../lib/models/Entrant");
var Attendee_1 = require("../lib/models/Attendee");
var Initializer_1 = __importDefault(require("../lib/util/Initializer"));
var testData = __importStar(require("./data/phase.testData"));
var LOG_LEVEL = log.levels.DEBUG;
var ID1 = 111483;
var EVENT_ID_1 = 25545;
var PHASE_1_PG_COUNT = 16;
var PHASE_1_SET_COUNT = 232;
var PHASE_1_ENTRANT_COUNT = 156;
var PHASE_1_ATTENDEE_COUNT = 156;
var ID2 = 45262;
var EVENT_ID_2 = 11787;
var PHASE_2_PG_COUNT = 25;
var PHASE_2_SET_COUNT = 1164;
var PHASE_2_ENTRANT_COUNT = 429;
var PHASE_2_ATTENDEE_COUNT = 200;
var ID3 = 100046;
var EVENT_ID_3 = 23596;
var PHASE_3_PG_COUNT = 16;
var PHASE_3_SET_COUNT = 1164;
var PHASE_3_ENTRANT_COUNT = 226;
var PHASE_3_ATTENDEE_COUNT = 226;
var phase1;
var phase2;
var phase3;
// let concurrency = 4
describe('Smash GG Phase', function () {
    var _this = this;
    this.timeout(10000);
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log.setLogLevel(LOG_LEVEL);
                    return [4 /*yield*/, Initializer_1.default(process.env.API_TOKEN)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Phase_1.Phase.get(ID1, EVENT_ID_1)];
                case 2:
                    phase1 = _a.sent();
                    return [4 /*yield*/, Phase_1.Phase.get(ID2, EVENT_ID_2)];
                case 3:
                    phase2 = _a.sent();
                    return [4 /*yield*/, Phase_1.Phase.get(ID3, EVENT_ID_3)];
                case 4:
                    phase3 = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
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
    it('should correctly get all sets 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        return [4 /*yield*/, testSets(phase1, PHASE_1_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    xit('should correctly get all sets 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(120000);
                        return [4 /*yield*/, testSets(phase2, PHASE_2_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    xit('should correctly get all sets 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        return [4 /*yield*/, testSets(phase3, PHASE_3_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // entrants
    it('should correctly get all entrants 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        return [4 /*yield*/, testEntrants(phase1, PHASE_1_ENTRANT_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    xit('should correctly get all entrants 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testEntrants(phase2, PHASE_2_ENTRANT_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should correctly get all entrants 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testEntrants(phase3, PHASE_3_ENTRANT_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // attendee
    it('should correctly get all attendees 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testAttendees(phase1, PHASE_1_ATTENDEE_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    xit('should correctly get all attendees 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testAttendees(phase2, PHASE_2_ATTENDEE_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should correctly get all attendees 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        return [4 /*yield*/, testAttendees(phase3, PHASE_3_ATTENDEE_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // phase groups
    it('should correctly get all phase groups 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testPhaseGroups(phase1, PHASE_1_PG_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should correctly get all phase groups 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testPhaseGroups(phase2, PHASE_2_PG_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should correctly get all phase groups 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testPhaseGroups(phase3, PHASE_3_PG_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    /*
    it('should correctly get all phase groups', async () => {
        this.timeout(45000)

        let phaseGroups1 = await phase1.getPhaseGroups({concurrency: concurrency})

        expect(phaseGroups1.length).to.be.equal(16)

        var hasDuplicates = function(a: Array<PhaseGroup>) {
            return _.uniq(a).length !== a.length
        }
        expect(hasDuplicates(phaseGroups1)).to.be.false

        phaseGroups1.forEach(set => {
            expect(set).to.be.an.instanceof(PhaseGroup)
        })

        return true
    })

    it('should correctly get all phase groups 2', async () => {
        this.timeout(45000)
        
        let phaseGroups2 = await phase2.getPhaseGroups({concurrency: concurrency})

        expect(phaseGroups2.length).to.be.equal(32)

        var hasDuplicates = function(a: Array<PhaseGroup>) {
            return _.uniq(a).length !== a.length
        }
        expect(hasDuplicates(phaseGroups2)).to.be.false

        phaseGroups2.forEach(set => {
            expect(set).to.be.an.instanceof(PhaseGroup)
        })

        return true
    })

    it('should correctly get all phase groups 3', async () => {
        this.timeout(45000)
        
        let phaseGroups3 = await phase3.getPhaseGroups({concurrency: concurrency})

        expect(phaseGroups3.length).to.be.equal(16)

        var hasDuplicates = function(a: Array<PhaseGroup>) {
            return _.uniq(a).length !== a.length
        }
        expect(hasDuplicates(phaseGroups3)).to.be.false

        phaseGroups3.forEach(set => {
            expect(set).to.be.an.instanceof(PhaseGroup)
        })

        return true
    })

    it('should correctly get all sets for a phase', async () => {
        this.timeout(30000)

        let sets1 = await phase1.getSets({concurrency: concurrency})

        expect(sets1.length).to.be.equal(248)

        sets1.forEach(set => {
            expect(set).to.be.instanceof(GGSet)
        })

        return true
    })

    xit('should correctly get all sets for a phase 2', async () => {
        this.timeout(45000)
        
        let sets2 = await phase2.getSets({concurrency: concurrency})

        expect(sets2.length).to.be.equal(1292)

        sets2.forEach(set => {
            expect(set).to.be.instanceof(GGSet)
        })

        return true
    })

    it('should correctly get all sets for a phase 3', async () => {
        this.timeout(45000)
        
        let sets3 = await phase3.getSets({concurrency: concurrency})

        expect(sets3.length).to.be.equal(450)

        sets3.forEach(set => {
            expect(set).to.be.instanceof(GGSet)
        })

        return true
    })

    it('should correctly get all players for a phase', async () => {
        this.timeout(30000)
        
        let players1 = await phase1.getPlayers({concurrency: concurrency})

        expect(players1.length).to.be.equal(156)

        players1.forEach(set => {
            expect(set).to.be.instanceof(Entrant)
        })

        return true
    })

    it('should correctly get all players for a phase', async () => {
        this.timeout(30000)
        
        let players2 = await phase2.getPlayers({concurrency: concurrency})

        expect(players2.length).to.be.equal(678)

        players2.forEach(set => {
            expect(set).to.be.instanceof(Entrant)
        })

        return true
    })

    it('should correctly get sets x minutes back', async () => {
        this.timeout(30000)

        let minutesBack = 5
        let event = await Event.getEventById(phase1.getEventId(), {})
        let eventDate = moment(event.getStartTime() as Date).add(30, 'minutes').toDate()

        let clock = sinon.useFakeTimers(eventDate)
        let sets = await phase1.getSetsXMinutesBack(minutesBack)
        expect(sets.length).to.be.equal(5)
        sets.forEach(set=> {
            expect(set).to.be.instanceof(GGSet)

            let now = moment()
            let then = moment(set.getCompletedAt() as Date)
            let diff = moment.duration(now.diff(then)).minutes()
            expect(diff <= minutesBack && diff >= 0 && set.getIsComplete()).to.be.true
        })
        clock.restore()
        return true
    })
    */
});
function testSets(phase, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phase.getSets()];
                case 1:
                    arr = _a.sent();
                    arr.forEach(function (set) {
                        expect(set).to.be.an.instanceof(GGSet_1.GGSet);
                        expect(arr.filter(function (x) { return x.getId() === set.getId(); }).length, 'Set array must not have duplicates! Found: ' + set.getId()).to.be.equal(1);
                    });
                    expect(arr.length).to.be.equal(expected);
                    return [2 /*return*/];
            }
        });
    });
}
function testEntrants(phase, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phase.getEntrants()];
                case 1:
                    arr = _a.sent();
                    arr.forEach(function (entrant) {
                        expect(entrant).to.be.an.instanceof(Entrant_1.Entrant);
                        expect(arr.filter(function (x) { return x.getId() === entrant.getId(); }).length, 'Entrant array must not have duplicates! Found: ' + entrant.getId()).to.be.equal(1);
                    });
                    expect(arr.length).to.be.equal(expected);
                    return [2 /*return*/];
            }
        });
    });
}
function testAttendees(phase, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phase.getAttendees()];
                case 1:
                    arr = _a.sent();
                    arr.forEach(function (attendee) {
                        expect(attendee).to.be.an.instanceof(Attendee_1.Attendee);
                        expect(arr.filter(function (x) { return x.getId() === attendee.getId(); }).length, 'Attendee array must not have duplicates! Found: ' + attendee.getId()).to.be.equal(1);
                    });
                    expect(arr.length).to.be.equal(expected);
                    return [2 /*return*/];
            }
        });
    });
}
function testPhaseGroups(phase, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phase.getPhaseGroups()];
                case 1:
                    arr = _a.sent();
                    arr.forEach(function (group) {
                        expect(group).to.be.an.instanceof(PhaseGroup_1.PhaseGroup);
                        expect(arr.filter(function (x) { return x.getId() === group.getId(); }).length, 'Phase Group array must not have duplicates! Found: ' + group.getId()).to.be.equal(1);
                    });
                    expect(arr.length).to.be.equal(expected);
                    return [2 /*return*/];
            }
        });
    });
}
