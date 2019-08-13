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
var moment_1 = __importDefault(require("moment"));
var chai_1 = __importDefault(require("chai"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
chai_1.default.use(chai_as_promised_1.default);
var expect = chai_1.default.expect;
var PhaseGroup_1 = require("../lib/models/PhaseGroup");
var Entrant_1 = require("../lib/models/Entrant");
var Attendee_1 = require("../lib/models/Attendee");
var GGSet_1 = require("../lib/models/GGSet");
var Seed_1 = require("../lib/models/Seed");
var Initializer_1 = __importDefault(require("../lib/util/Initializer"));
var testData = __importStar(require("./data/phaseGroup.testData"));
var log = __importStar(require("../lib/util/Logger"));
var phaseGroup1;
var phaseGroup2;
var phaseGroup3;
var phaseGroup4;
var ID1 = 301994;
var ID2 = 887918; // g6 melee doubles top 6
var ID3 = 44445;
var ID4 = 618443; // cameron's 21st, unfinished
var PG_1_START_AT = 1510401600;
var PG_1_DATE = moment_1.default.unix(PG_1_START_AT);
// Saturday, November 11, 2017 12:00:00 PM
// Saturday, November 11, 2017 7:00:00 AM GMT-05:00
var PG_4_START_AT = 1532210400;
var PG_4_DATE = moment_1.default.unix(PG_4_START_AT);
// Saturday, July 21, 2018 10:00:00 PM
// Saturday, July 21, 2018 6:00:00 PM GMT-04:00 DST
var PG_1_SEED_COUNT = 13;
var PG_1_ENTRANT_COUNT = 13;
var PG_1_ATTENDEE_COUNT = 13;
var PG_1_SET_COUNT = 26;
var PG_1_DQ_FILTERED_SET_COUNT = 26;
var PG_1_RESET_FILTERED_SET_COUNT = 26;
var PG_1_COMPLETED_SET_COUNT = 26;
var PG_1_INCOMPLETE_SET_COUNT = 0;
var PG_2_SEED_COUNT = 6;
var PG_2_ENTRANT_COUNT = 6;
var PG_2_ATTENDEE_COUNT = 12;
var PG_2_SET_COUNT = 7;
var PG_2_DQ_FILTERED_SET_COUNT = 7;
// const PG_2_RESET_FILTERED_SET_COUNT = 
// const PG_2_COMPLETED_SET_COUNT = 
// const PG_2_INCOMPLETE_SET_COUNT = 
var PG_3_SEED_COUNT = 23;
var PG_3_ENTRANT_COUNT = 23;
var PG_3_ATTENDEE_COUNT = 46;
var PG_3_SET_COUNT = 70;
// const PG_3_DQ_FILTERED_SET_COUNT = 
// const PG_3_RESET_FILTERED_SET_COUNT = 
// const PG_3_COMPLETED_SET_COUNT = 
// const PG_3_INCOMPLETE_SET_COUNT = 
var PG_4_SEED_COUNT = 39;
var PG_4_ENTRANT_COUNT = 39;
var PG_4_ATTENDEE_COUNT = 39;
var PG_4_SET_COUNT = 77;
// const PG_4_DQ_FILTERED_SET_COUNT = 28
var PG_4_RESET_FILTERED_SET_COUNT = 76;
var PG_4_COMPLETED_SET_COUNT = 72;
var PG_4_INCOMPLETE_SET_COUNT = 5;
var LOG_LEVEL = log.levels.VERBOSE;
describe('smash.gg PhaseGroup', function () {
    var _this = this;
    this.timeout(15000);
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log.setLogLevel(LOG_LEVEL);
                    return [4 /*yield*/, Initializer_1.default(process.env.API_TOKEN)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, PhaseGroup_1.PhaseGroup.get(ID1)];
                case 2:
                    phaseGroup1 = _a.sent();
                    return [4 /*yield*/, PhaseGroup_1.PhaseGroup.get(ID2)];
                case 3:
                    phaseGroup2 = _a.sent();
                    return [4 /*yield*/, PhaseGroup_1.PhaseGroup.get(ID3)];
                case 4:
                    phaseGroup3 = _a.sent();
                    return [4 /*yield*/, PhaseGroup_1.PhaseGroup.get(ID4)];
                case 5:
                    phaseGroup4 = _a.sent();
                    return [2 /*return*/, true];
            }
        });
    }); });
    // id
    it('should return the correct phase group id 1', function () {
        expect(phaseGroup1.getId()).to.be.equal(testData.pg1.id);
    });
    it('should return the correct phase group id 2', function () {
        expect(phaseGroup2.getId()).to.be.equal(testData.pg2.id);
    });
    it('should return the correct phase group id 3', function () {
        expect(phaseGroup3.getId()).to.be.equal(testData.pg3.id);
    });
    it('should return the correct phase group id 4', function () {
        expect(phaseGroup4.getId()).to.be.equal(testData.pg4.id);
    });
    // phase id
    it('should return the correct phase id 1', function () {
        expect(phaseGroup1.getPhaseId()).to.be.equal(testData.pg1.phaseId);
    });
    it('should return the correct phase id 2', function () {
        expect(phaseGroup2.getPhaseId()).to.be.equal(testData.pg2.phaseId);
    });
    it('should return the correct phase id 3', function () {
        expect(phaseGroup3.getPhaseId()).to.be.equal(testData.pg3.phaseId);
    });
    it('should return the correct phase id 4', function () {
        expect(phaseGroup4.getPhaseId()).to.be.equal(testData.pg4.phaseId);
    });
    // displayIdentifier
    it('should return the correct display identifier 1', function () {
        expect(phaseGroup1.getDisplayIdentifier()).to.be.equal(testData.pg1.displayIdentifier);
    });
    it('should return the correct display identifier 2', function () {
        expect(phaseGroup2.getDisplayIdentifier()).to.be.equal(testData.pg2.displayIdentifier);
    });
    it('should return the correct display identifier 3', function () {
        expect(phaseGroup3.getDisplayIdentifier()).to.be.equal(testData.pg3.displayIdentifier);
    });
    it('should return the correct display identifier 4', function () {
        expect(phaseGroup4.getDisplayIdentifier()).to.be.equal(testData.pg4.displayIdentifier);
    });
    // firstRoundTime
    it('should return the correct first round time 1', function () {
        expect(phaseGroup1.getFirstRoundTime()).to.be.equal(testData.pg1.firstRoundTime);
    });
    it('should return the correct first round time 2', function () {
        expect(phaseGroup2.getFirstRoundTime()).to.be.equal(testData.pg2.firstRoundTime);
    });
    it('should return the correct first round time 3', function () {
        expect(phaseGroup3.getFirstRoundTime()).to.be.equal(testData.pg3.firstRoundTime);
    });
    it('should return the correct first round time 4', function () {
        expect(phaseGroup4.getFirstRoundTime()).to.be.equal(testData.pg4.firstRoundTime);
    });
    // wave id
    it('should return the correct wave id 1', function () {
        expect(phaseGroup1.getWaveId()).to.be.equal(testData.pg1.waveId);
    });
    it('should return the correct wave id 2', function () {
        expect(phaseGroup2.getWaveId()).to.be.equal(testData.pg2.waveId);
    });
    it('should return the correct wave id 3', function () {
        expect(phaseGroup3.getWaveId()).to.be.equal(testData.pg3.waveId);
    });
    it('should return the correct wave id 4', function () {
        expect(phaseGroup4.getWaveId()).to.be.equal(testData.pg4.waveId);
    });
    // tiebreaker
    it('should return the correct tiebreaker order 1', function () {
        expect(phaseGroup1.getTiebreakOrder()).to.deep.equal(testData.pg1.tiebreakOrder);
    });
    it('should return the correct tiebreaker order 2', function () {
        expect(phaseGroup2.getTiebreakOrder()).to.deep.equal(testData.pg2.tiebreakOrder);
    });
    it('should return the correct tiebreaker order 3', function () {
        expect(phaseGroup3.getTiebreakOrder()).to.deep.equal(testData.pg3.tiebreakOrder);
    });
    it('should return the correct tiebreaker order 4', function () {
        expect(phaseGroup4.getTiebreakOrder()).to.deep.equal(testData.pg4.tiebreakOrder);
    });
    // seeds
    it('should return the correct seeds 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSeeds(phaseGroup1, PG_1_SEED_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct seeds 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSeeds(phaseGroup2, PG_2_SEED_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    xit('should return the correct seeds 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSeeds(phaseGroup3, PG_3_SEED_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct seeds 4', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSeeds(phaseGroup4, PG_4_SEED_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // entrants
    it('should return the correct entrants 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testEntrants(phaseGroup1, PG_1_ENTRANT_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct entrants 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testEntrants(phaseGroup2, PG_2_ENTRANT_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    xit('should return the correct entrants 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testEntrants(phaseGroup3, PG_3_ENTRANT_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct entrants 4', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testEntrants(phaseGroup4, PG_4_ENTRANT_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // participants
    it('should return the correct attendees 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testAttendees(phaseGroup1, PG_1_ATTENDEE_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct attendees 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testAttendees(phaseGroup2, PG_2_ATTENDEE_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    xit('should return the correct attendees 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testAttendees(phaseGroup3, PG_3_ATTENDEE_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct attendees 4', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testAttendees(phaseGroup4, PG_4_ATTENDEE_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // set
    it('should return the correct Sets 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSets(phaseGroup1, PG_1_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct Sets 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSets(phaseGroup2, PG_2_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    xit('should return the correct Sets 3', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSets(phaseGroup3, PG_3_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct Sets 4', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSets(phaseGroup4, PG_4_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // sets filter dq
    it('should return the correct DQ filtered Sets 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSetsFilterDQ(phaseGroup1, PG_1_DQ_FILTERED_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct DQ filtered Sets 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSetsFilterDQ(phaseGroup2, PG_2_DQ_FILTERED_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // sets filter reset
    it('should return the correct Reset filtered Sets 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSetsFilterResets(phaseGroup1, PG_1_RESET_FILTERED_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should return the correct Reset filtered Sets 4', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSetsFilterResets(phaseGroup4, PG_4_RESET_FILTERED_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // completed sets
    it('should get the correct number of completed sets 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSetsCompleted(phaseGroup1, PG_1_COMPLETED_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should get the correct number of completed sets 4', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSetsCompleted(phaseGroup4, PG_4_COMPLETED_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // incompleted sets
    it('should get the correct number of incomplete sets 1', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSetsIncomplete(phaseGroup1, PG_1_INCOMPLETE_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should get the correct number of incomplete sets 4', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(30000);
                        return [4 /*yield*/, testSetsIncomplete(phaseGroup4, PG_4_INCOMPLETE_SET_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    });
    // finished x minutes ago
    /*
    xit('should get the correct number of sets completed x minutes ago 1', async function() => {
        this.timeout(30000)
        const fakeTime = PG_4_DATE.add(3, 'hours').toDate()
        const clock = sinon.useFakeTimers(fakeTime)

        const sets: IGGSet[] = await phaseGroup1.getSetsXMinutesBack(5)
        const hasDuplicates = function(a: IGGSet[]) {
            return _.uniq(a).length !== a.length
        }
        expect(hasDuplicates(sets)).to.be.false
        sets.forEach(set => {
            expect(set).to.be.an.instanceof(GGSet)
        })
        expect(sets.length).to.be.equal(0)

        clock.restore()
        return true
    })
    xit('should get the correct number of sets completed x minutes ago 4', async function() => {
        this.timeout(30000)
        const fakeTime = PG_4_DATE.add(3, 'hours').toDate()
        const clock = sinon.useFakeTimers(fakeTime)

        const sets: IGGSet[] = await phaseGroup4.getSetsXMinutesBack(5)
        const hasDuplicates = (a: IGGSet[]) => {
            return _.uniq(a).length !== a.length
        }

        expect(hasDuplicates(sets)).to.be.equal(false)
        sets.forEach(set => {
            expect(set).to.be.an.instanceof(GGSet)
        })
        expect(sets.length).to.be.equal(2)

        clock.restore()
        return true
    })
    */
});
function testSeeds(phaseGroup, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phaseGroup.getSeeds()];
                case 1:
                    arr = _a.sent();
                    arr.forEach(function (seed) {
                        expect(seed).to.be.an.instanceof(Seed_1.Seed);
                        expect(arr.filter(function (x) { return x.getId() === seed.getId(); }).length, 'Seed array must not have duplicates! Found: ' + seed.getId()).to.be.equal(1);
                    });
                    expect(arr.length).to.be.equal(expected);
                    return [2 /*return*/];
            }
        });
    });
}
function testSets(phaseGroup, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phaseGroup.getSets()];
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
function testSetsFilterDQ(phaseGroup, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phaseGroup.getSets({ filterDQs: true })];
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
function testSetsFilterResets(phaseGroup, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phaseGroup.getSets({ filterResets: true })];
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
function testSetsFilterByes(phaseGroup, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phaseGroup.getSets({ filterByes: true })];
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
function testSetsCompleted(phaseGroup, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phaseGroup.getCompleteSets()];
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
function testSetsIncomplete(phaseGroup, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phaseGroup.getIncompleteSets()];
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
function testEntrants(phaseGroup, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phaseGroup.getEntrants()];
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
function testAttendees(phaseGroup, expected) {
    return __awaiter(this, void 0, void 0, function () {
        var arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phaseGroup.getAttendees()];
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
