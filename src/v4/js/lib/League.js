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
var lodash_1 = __importDefault(require("lodash"));
var Logger_1 = __importDefault(require("./util/Logger"));
var Event_1 = require("./Event");
var Phase_1 = require("./Phase");
var PhaseGroup_1 = require("./PhaseGroup");
var Entrant_1 = require("./Entrant");
var Attendee_1 = require("./Attendee");
var GGSet_1 = require("./GGSet");
var NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
var queries = __importStar(require("./scripts/leagueQueries"));
var League = /** @class */ (function () {
    function League(id, name, slug, url) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.url = url;
    }
    League.parse = function (data) {
        return new League(data.id, data.name, data.slug, data.url);
    };
    League.parseFull = function (data) {
        return League.parse(data.league);
    };
    League.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting League with id %s', id);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.league, { id: id })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, League.parseFull(data)];
                }
            });
        });
    };
    League.get = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting League with slug "%s"', slug);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.leagueBySlug, { slug: slug })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, League.parseFull(data)];
                }
            });
        });
    };
    League.prototype.getId = function () {
        return this.id;
    };
    League.prototype.getName = function () {
        return this.name;
    };
    League.prototype.getSlug = function () {
        return this.slug;
    };
    League.prototype.getUrl = function () {
        return this.url;
    };
    League.prototype.getEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, name, data, events;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, id = _a.id, name = _a.name;
                        Logger_1.default.info('Getting Events for League [%s :: %s]', id, name);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.leagueEvents, { id: id })];
                    case 1:
                        data = _b.sent();
                        events = data.league.events.nodes.map(function (event) { return Event_1.Event.parse(event); });
                        return [2 /*return*/, events];
                }
            });
        });
    };
    League.prototype.getPhases = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, name, data, events, phases;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, id = _a.id, name = _a.name;
                        Logger_1.default.info('Getting Phases for League [%s :: %s]', id, name);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.leaguePhases, { id: id })];
                    case 1:
                        data = _b.sent();
                        events = data.league.events;
                        phases = lodash_1.default.flatten(events.map(function (event) { return event.phases.map(function (phase) { return Phase_1.Phase.parse(phase, event.id); }); }));
                        return [2 /*return*/, phases];
                }
            });
        });
    };
    League.prototype.getPhaseGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, name, data, events, phaseGroups;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, id = _a.id, name = _a.name;
                        Logger_1.default.info('Getting Phase Groups for League [%s :: %s]', id, name);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.leaguePhaseGroups, { id: id })];
                    case 1:
                        data = _b.sent();
                        events = data.league.events;
                        phaseGroups = lodash_1.default.flatten(events.map(function (event) { return event.phaseGroups.map(function (group) { return PhaseGroup_1.PhaseGroup.parse(group); }); }));
                        return [2 /*return*/, phaseGroups];
                }
            });
        });
    };
    League.prototype.getSets = function (options) {
        if (options === void 0) { options = GGSet_1.IGGSet.getDefaultSetOptions(); }
        return __awaiter(this, void 0, void 0, function () {
            var pgs, sets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting Sets for League [%s :: %s]', this.id, this.name);
                        Logger_1.default.warn('Puilling Sets for large or massive Leagues may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Sets');
                        return [4 /*yield*/, this.getPhaseGroups()];
                    case 1:
                        pgs = _a.sent();
                        return [4 /*yield*/, NetworkInterface_1.default.clusterQuery(pgs, 'getSets', options)];
                    case 2:
                        sets = _a.sent();
                        return [2 /*return*/, lodash_1.default.flatten(sets)];
                }
            });
        });
    };
    League.prototype.getEntrants = function (options) {
        if (options === void 0) { options = Entrant_1.IEntrant.getDefaultEntrantOptions(); }
        return __awaiter(this, void 0, void 0, function () {
            var pgs, entrants;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting Entrants for League [%s :: %s]', this.id, this.name);
                        Logger_1.default.warn('Puilling Entrants for large or massive Leagues may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Entrants');
                        return [4 /*yield*/, this.getPhaseGroups()];
                    case 1:
                        pgs = _a.sent();
                        return [4 /*yield*/, NetworkInterface_1.default.clusterQuery(pgs, 'getEntrants', options)];
                    case 2:
                        entrants = _a.sent();
                        entrants = lodash_1.default.uniq(entrants);
                        return [2 /*return*/, lodash_1.default.flatten(entrants)];
                }
            });
        });
    };
    League.prototype.getAttendees = function (options) {
        if (options === void 0) { options = Attendee_1.IAttendee.getDefaultAttendeeOptions(); }
        return __awaiter(this, void 0, void 0, function () {
            var pgs, attendees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting Attendees for League [%s :: %s]', this.id, this.name);
                        Logger_1.default.warn('Puilling Attendees for large or massive Leagues may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Attendees');
                        return [4 /*yield*/, this.getPhaseGroups()];
                    case 1:
                        pgs = _a.sent();
                        return [4 /*yield*/, NetworkInterface_1.default.clusterQuery(pgs, 'getAttendees', options)];
                    case 2:
                        attendees = _a.sent();
                        attendees = lodash_1.default.uniqWith(attendees, function (a1, a2) { return Attendee_1.Attendee.eq(a1, a2); });
                        return [2 /*return*/, lodash_1.default.flatten(attendees)];
                }
            });
        });
    };
    return League;
}());
exports.League = League;
