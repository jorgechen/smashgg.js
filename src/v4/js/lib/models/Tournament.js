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
var moment_1 = __importDefault(require("moment"));
var Logger_1 = __importDefault(require("../util/Logger"));
var NetworkInterface_1 = __importDefault(require("../util/NetworkInterface"));
var queries = __importStar(require("../scripts/tournamentQueries"));
var Venue_1 = require("./Venue");
var Organizer_1 = require("./Organizer");
var Event_1 = require("./Event");
var Phase_1 = require("./Phase");
var PhaseGroup_1 = require("./PhaseGroup");
var Entrant_1 = require("./Entrant");
var Attendee_1 = require("./Attendee");
var GGSet_1 = require("./GGSet");
var Tournament = /** @class */ (function () {
    function Tournament(id, name, slug, startTime, endTime, timezone, venue, organizer) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.startTime = startTime;
        this.endTime = endTime;
        this.timezone = timezone;
        this.venue = venue;
        this.organizer = organizer;
    }
    Tournament.parse = function (data) {
        var startTimeDate = data.startAt ? moment_1.default.unix(data.startAt).toDate() : null;
        var endTimeDate = data.endAt ? moment_1.default.unix(data.endAt).toDate() : null;
        var venue = new Venue_1.Venue(data.venueName, data.venueAddress, data.city, data.addrState, data.countryCode, data.region, data.postalCode, data.lat, data.lng);
        var organizer = new Organizer_1.Organizer(data.ownerId, data.contactEmail, data.contactPhone, data.contactTwitter, data.contactInfo);
        return new Tournament(data.id, data.name, data.slug, startTimeDate, endTimeDate, data.timezone, venue, organizer);
    };
    Tournament.parseFull = function (data) {
        return Tournament.parse(data.tournament);
    };
    Tournament.getById = function (theId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting Tournament with id %s', theId);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.tournament, { id: theId })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, Tournament.parseFull(data)];
                }
            });
        });
    };
    Tournament.get = function (theSlug) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting Tournament with slug "%s"', theSlug);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.tournamentBySlug, { slug: theSlug })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, Tournament.parseFull(data)];
                }
            });
        });
    };
    Tournament.prototype.getId = function () {
        return this.id;
    };
    Tournament.prototype.getName = function () {
        return this.name;
    };
    Tournament.prototype.getSlug = function () {
        return this.slug;
    };
    Tournament.prototype.getTimezone = function () {
        return this.timezone;
    };
    Tournament.prototype.getStartTime = function () {
        return this.startTime;
    };
    Tournament.prototype.getStartTimeString = function () {
        return String(this.startTime);
    };
    Tournament.prototype.getEndTime = function () {
        return this.endTime;
    };
    Tournament.prototype.getEndTimeString = function () {
        return String(this.endTime);
    };
    Tournament.prototype.getVenue = function () {
        return this.venue;
    };
    Tournament.prototype.getVenueName = function () {
        return this.venue.getName();
    };
    Tournament.prototype.getCity = function () {
        return this.venue.getCity();
    };
    Tournament.prototype.getState = function () {
        return this.venue.getState();
    };
    Tournament.prototype.getAddress = function () {
        return this.venue.getAddress();
    };
    Tournament.prototype.getZipCode = function () {
        return this.venue.getPostalCode();
    };
    Tournament.prototype.getOrganizer = function () {
        return this.organizer;
    };
    Tournament.prototype.getContactInfo = function () {
        return this.organizer.getInfo();
    };
    Tournament.prototype.getContactEmail = function () {
        return this.organizer.getEmail();
    };
    Tournament.prototype.getContactTwitter = function () {
        return this.organizer.getTwitter();
    };
    Tournament.prototype.getOwnerId = function () {
        return this.organizer.getId();
    };
    Tournament.prototype.getEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting Events for Tournament [%s :: %s]', this.id, this.name);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.tournamentEvents, { id: this.id })];
                    case 1:
                        data = _a.sent();
                        events = data.tournament.events.map(function (event) { return Event_1.Event.parse(event); });
                        return [2 /*return*/, events];
                }
            });
        });
    };
    Tournament.prototype.getPhases = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, events, phases;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting Phases for Tournament [%s :: %s]', this.id, this.name);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.tournamentPhases, { id: this.id })];
                    case 1:
                        data = _a.sent();
                        events = data.tournament.events;
                        phases = lodash_1.default.flatten(events.map(function (event) { return event.phases.map(function (phase) { return Phase_1.Phase.parse(phase, event.id); }); }));
                        return [2 /*return*/, phases];
                }
            });
        });
    };
    Tournament.prototype.getPhaseGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, events, phaseGroups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting Phase Groups for Tournament [%s :: %s]', this.id, this.name);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.tournamentPhaseGroups, { id: this.id })];
                    case 1:
                        data = _a.sent();
                        events = data.tournament.events;
                        phaseGroups = lodash_1.default.flatten(events.map(function (event) { return event.phaseGroups.map(function (group) { return PhaseGroup_1.PhaseGroup.parse(group); }); }));
                        return [2 /*return*/, phaseGroups];
                }
            });
        });
    };
    Tournament.prototype.getSets = function (options) {
        if (options === void 0) { options = GGSet_1.GGSet.getDefaultSetOptions(); }
        return __awaiter(this, void 0, void 0, function () {
            var pgs, sets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting Sets for Tournament [%s :: %s]', this.id, this.name);
                        Logger_1.default.warn('Puilling Sets for large or massive Tournaments may ' +
                            'lead to long execution times and lowered usability. It ' +
                            'is recommended to pull from Event if you are targetting ' +
                            'a single event\'s Sets');
                        return [4 /*yield*/, this.getPhaseGroups()];
                    case 1:
                        pgs = _a.sent();
                        return [4 /*yield*/, NetworkInterface_1.default.clusterQuery(pgs, 'getSets', options)];
                    case 2:
                        sets = _a.sent();
                        return [2 /*return*/, lodash_1.default.uniqBy(lodash_1.default.flatten(sets), 'id')];
                }
            });
        });
    };
    Tournament.prototype.getEntrants = function (options) {
        if (options === void 0) { options = Entrant_1.Entrant.getDefaultEntrantOptions(); }
        return __awaiter(this, void 0, void 0, function () {
            var pgs, entrants;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting Entrants for Tournament [%s :: %s]', this.id, this.name);
                        Logger_1.default.warn('Puilling Entrants for large or massive Tournaments may ' +
                            'lead to long execution times and lowered usability. It is ' +
                            'recommended to pull from Event if you are targetting a ' +
                            'single event\'s Entrants');
                        return [4 /*yield*/, this.getPhaseGroups()];
                    case 1:
                        pgs = _a.sent();
                        return [4 /*yield*/, NetworkInterface_1.default.clusterQuery(pgs, 'getEntrants', options)];
                    case 2:
                        entrants = _a.sent();
                        entrants = lodash_1.default.uniq(entrants);
                        return [2 /*return*/, lodash_1.default.uniqBy(lodash_1.default.flatten(entrants), 'id')];
                }
            });
        });
    };
    Tournament.prototype.getAttendees2 = function (options) {
        if (options === void 0) { options = Attendee_1.Attendee.getDefaultAttendeeOptions(); }
        return __awaiter(this, void 0, void 0, function () {
            var pgs, attendees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Getting Attendees for Tournament [%s :: %s]', this.id, this.name);
                        Logger_1.default.warn('Puilling Attendees for large or massive Tournaments may ' +
                            'lead to long execution times and lowered usability. It is ' +
                            'recommended to pull from Event if you are targetting a ' +
                            'single event\'s Attendees');
                        if (!(options.page != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAttendees(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.getPhaseGroups()];
                    case 3:
                        pgs = _a.sent();
                        return [4 /*yield*/, NetworkInterface_1.default.clusterQuery(pgs, 'getAttendees', options)];
                    case 4:
                        attendees = _a.sent();
                        attendees = lodash_1.default.uniqWith(attendees, function (a1, a2) { return Attendee_1.Attendee.eq(a1, a2); });
                        return [2 /*return*/, lodash_1.default.uniqBy(lodash_1.default.flatten(attendees), 'id')];
                }
            });
        });
    };
    Tournament.prototype.searchAttendees = function (theSmashtag) {
        return __awaiter(this, void 0, void 0, function () {
            var results, nodes, matchingAttendees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Searching Tournament [%s :: %s] with smashtag: %s', this.id, this.name, theSmashtag);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.tournamentAttendeeSearch, { id: this.id, smashtag: theSmashtag })];
                    case 1:
                        results = _a.sent();
                        try {
                            nodes = results.tournament.participants.nodes;
                            if (nodes.length === 0)
                                return [2 /*return*/, null];
                            matchingAttendees = nodes.map(function (element) { return Attendee_1.Attendee.parse(element); });
                            return [2 /*return*/, lodash_1.default.uniqBy(matchingAttendees, 'id')];
                        }
                        catch (_b) {
                            return [2 /*return*/, null]; // bad parse, no attendee
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Tournament.prototype.searchAttendeesBySponsorTag = function (sponsorTag) {
        return __awaiter(this, void 0, void 0, function () {
            var results, nodes, matchingAttendees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1.default.info('Searching Tournament [%s :: %s] with smashtag: %s', this.id, this.name, sponsorTag);
                        return [4 /*yield*/, NetworkInterface_1.default.query(queries.tournamentAttendeeSearchByPrefix, { id: this.id, sponsor: sponsorTag.toLowerCase() })];
                    case 1:
                        results = _a.sent();
                        try {
                            nodes = results.tournament.participants.nodes;
                            if (nodes.length === 0)
                                return [2 /*return*/, null];
                            matchingAttendees = nodes.map(function (element) { return Attendee_1.Attendee.parse(element); });
                            return [2 /*return*/, lodash_1.default.uniqBy(matchingAttendees, 'id')];
                        }
                        catch (_b) {
                            return [2 /*return*/, null]; // bad parse, no attendee
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    async getSets2(options: IGGSet.SetOptions = IGGSet.getDefaultSetOptions()) : Promise<GGSet[]> {
        log.info('Getting Sets for Tournament [%s :: %s]', this.id, this.name)
        let data: ITournament.TournamentSetData[] = await NI.paginatedQuery(
            `Tournament Sets [${this.id} :: ${this.name}]`,
            queries.tournamentSets, {id: this.id},
            options, {}, 4
        )
        let events = _.flatten(data.map(d => d.tournament.events))
        let phaseGroups = _.flatten(events.map(event => event.phaseGroups))
        let setData: IGGSet.SetData[] = _.flatten(phaseGroups.map(pg => pg.paginatedSets.nodes))
        let sets: GGSet[] = setData.map(set => GGSet.parse(set))
        return sets
    }

    async getIncompleteSets(options: IGGSet.SetOptions = IGGSet.getDefaultSetOptions()) : Promise<GGSet[]> {
        log.info('Getting Incomplete Sets for Tournament [%s :: %s]', this.id, this.name)
        let sets: GGSet[] = await this.getSets()
        return GGSet.filterForIncompleteSets(sets)
    }

    async getCompletedSets(options: IGGSet.SetOptions = IGGSet.getDefaultSetOptions()) : Promise<GGSet[]> {
        log.info('Getting Completed Sets for Tournament [%s :: %s]', this.id, this.name)
        let sets: GGSet[] = await this.getSets()
        return GGSet.filterForCompleteSets(sets)
    }

    async getSetsXMinutesBack(
        minutes: number, options: IGGSet.SetOptions = IGGSet.getDefaultSetOptions()
    ): Promise<GGSet[]> {
        log.info('Getting Sets Completed %s minutes ago for Tournament [%s :: %s]', minutes, this.id, this.name)
        let sets: GGSet[] = await this.getSets()
        return GGSet.filterForXMinutesBack(sets, minutes)
    }

    async getEntrants2(options: IEntrant.EntrantOptions = IEntrant.getDefaultEntrantOptions()) : Promise<Entrant[]> {
        log.info('Getting Entrants for Tournament [%s :: %s]', this.id, this.name)
        let data: ITournament.TournamentEntrantData[] = await NI.paginatedQuery(
            `Tournament Entrants [${this.id} :: ${this.name}]`,
            queries.tournamentEntrants, {id: this.id},
            options, {}, 3
        )
        let tournaments = _.flatten(data.map(d => d.tournament))
        let events = _.flatten(tournaments.map(tournament => tournament.events))
        let entrantData: IEntrant.EntrantData[] = _.flatten(events.map(event => event.entrant))
        let entrants: Entrant[] = entrantData.map(entrant => Entrant.parse(entrant))
        return entrants
    }
    */
    Tournament.prototype.getAttendees = function (options) {
        if (options === void 0) { options = Attendee_1.Attendee.getDefaultAttendeeOptions(); }
        return __awaiter(this, void 0, void 0, function () {
            var data, tournaments, attendeeData, attendees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkInterface_1.default.paginatedQuery("Tournament Attendee [" + this.id + " :: " + this.name + "]", queries.tournamentAttendees, { id: this.id }, options, {}, 3)];
                    case 1:
                        data = _a.sent();
                        tournaments = lodash_1.default.flatten(data.map(function (d) { return d.tournament; }));
                        attendeeData = lodash_1.default.flatten(tournaments.map(function (tournament) { return tournament.participants; }));
                        attendees = lodash_1.default.flatten(attendeeData.map(function (aData) { return aData.nodes.map(function (attendee) { return Attendee_1.Attendee.parse(attendee); }); }));
                        return [2 /*return*/, lodash_1.default.uniqBy(attendees, 'id')];
                }
            });
        });
    };
    return Tournament;
}());
exports.Tournament = Tournament;
