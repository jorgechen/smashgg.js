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
const lodash_1 = __importDefault(require("lodash"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const events_1 = require("events");
const Game_1 = require("./Game"); // TODO change to internal later 
const Logger_1 = __importDefault(require("./util/Logger"));
const NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
const queries = __importStar(require("./scripts/setQueries"));
const Attendee_1 = require("./Attendee");
const Entrant_1 = require("./Entrant");
const DISPLAY_SCORE_REGEX = new RegExp(/^([\S\s]*) ([0-9]{1,3}) - ([\S\s]*) ([0-9]{1,3})$/);
class GGSet extends events_1.EventEmitter {
    constructor(id, eventId, phaseGroupId, displayScore, fullRoundText, round, startedAt, completedAt, winnerId, totalGames, state, player1, player2, score1, score2) {
        super();
        this.id = id;
        this.eventId = eventId;
        this.phaseGroupId = phaseGroupId;
        this.displayScore = displayScore;
        this.fullRoundText = fullRoundText;
        this.round = round;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
        this.winnerId = winnerId;
        this.totalGames = totalGames;
        this.state = state;
        this.player1 = player1;
        this.player2 = player2;
        this.score1 = score1;
        this.score2 = score2;
    }
    static parseDisplayScore(displayScore) {
        let parsed = DISPLAY_SCORE_REGEX.exec(displayScore);
        let tag1, score1, tag2, score2;
        if (parsed) {
            tag1 = parsed[1];
            score1 = +parsed[2];
            tag2 = parsed[3];
            score2 = +parsed[4];
        }
        return {
            tag1: tag1 || null,
            tag2: tag2 || null,
            score1: score1 || 0,
            score2: score2 || 0
        };
    }
    static async get(id) {
        Logger_1.default.info('Getting set with id %s', id);
        let data = await NetworkInterface_1.default.query(queries.set, { id: id.toString() });
        return GGSet.parseFull(data);
    }
    static parse(data) {
        let displayScoreParsed = GGSet.parseDisplayScore(data.displayScore);
        let p1 = IGGSet.PlayerLite.parse(displayScoreParsed.tag1, data.slots[0]);
        let p2 = IGGSet.PlayerLite.parse(displayScoreParsed.tag2, data.slots[1]);
        return new GGSet(+data.id, data.eventId, data.phaseGroupId, data.displayScore, data.fullRoundText, data.round, data.startedAt, data.completedAt, data.winnerId, data.totalGames, data.state, p1, p2, displayScoreParsed.score1, displayScoreParsed.score2);
    }
    static parseFull(data) {
        return GGSet.parse(data.set);
    }
    /** Instance Based **/
    // simple
    getEventId() {
        return this.eventId;
    }
    getPhaseGroupId() {
        return this.phaseGroupId;
    }
    getDisplayScore() {
        return this.displayScore;
    }
    getFullRoundText() {
        return this.fullRoundText;
    }
    getRound() {
        return this.round;
    }
    getState() {
        return this.state;
    }
    getPlayer1() {
        return this.player1;
    }
    getPlayer1Tag() {
        return this.player1.tag;
    }
    getPlayer1AttendeeIds() {
        return this.player1.attendeeIds;
    }
    getPlayer1PlayerId() {
        return this.player1.entrantId;
    }
    getPlayer2() {
        return this.player2;
    }
    getPlayer2Tag() {
        return this.player2.tag;
    }
    getPlayer2AttendeeIds() {
        return this.player2.attendeeIds;
    }
    getPlayer2PlayerId() {
        return this.player2.entrantId;
    }
    getStartedAtTimestamp() {
        return this.startedAt;
    }
    getCompletedAtTimestamp() {
        return this.completedAt;
    }
    // Todo needs coverage
    getStartedAt() {
        if (this.startedAt)
            return moment_timezone_1.default.unix(this.startedAt).toDate();
        else
            return null;
    }
    getCompletedAt() {
        if (this.completedAt)
            return moment_timezone_1.default.unix(this.completedAt).toDate();
        else
            return null;
    }
    // calculated
    getWinnerId() {
        return this.winnerId ? this.winnerId : null;
    }
    getLoserId() {
        switch (this.winnerId) {
            case this.player1.entrantId:
                return this.player2.entrantId ? this.player2.entrantId : null;
            case this.player2.entrantId:
                return this.player1.entrantId ? this.player1.entrantId : null;
            default:
                return null;
        }
    }
    getIsComplete() {
        return this.completedAt ? true : false;
    }
    getCompletedTime() {
        if (this.completedAt)
            return moment_timezone_1.default.unix(this.completedAt).toDate();
        else
            return null;
    }
    getPlayer1Score() {
        if (this.score1)
            return this.score1;
        else
            return 0;
    }
    getPlayer2Score() {
        if (this.score2)
            return this.score2;
        else
            return 0;
    }
    getWinner() {
        if (this.winnerId && this.player2.entrantId && this.player1.entrantId)
            switch (this.winnerId) {
                case this.player1.entrantId:
                    return this.player1;
                case this.player2.entrantId:
                    return this.player2;
                default:
                    throw new Error(`Winner ID ${this.winnerId} does not match either player ID: [${[this.player1.entrantId, this.player2.entrantId].join(',')}]`);
            }
        else
            throw new Error(`Set (${this.id}) must be complete to get the Winning Player`);
    }
    getLoser() {
        if (this.winnerId && this.player1.entrantId && this.player2.entrantId)
            switch (this.winnerId) {
                case this.player1.entrantId:
                    return this.player2;
                case this.player2.entrantId:
                    return this.player1;
                default:
                    throw new Error(`Loser ID does not match either player ID: [${[this.player1.entrantId, this.player2.entrantId].join(',')}]`);
            }
        else
            throw new Error(`Set (${this.id}) must be complete to get the Losing Player`);
    }
    getBestOfCount() {
        return this.totalGames || 0;
    }
    getWinnerScore() {
        if (!this.completedAt)
            throw new Error('Cannot get winner score of incomplete set');
        else if (this.score1 == null || this.score2 == null) {
            if (this.score1 == null)
                return this.score2;
            else
                return this.score2;
        }
        else
            return this.score1 > this.score2 ? this.score1 : this.score2;
    }
    getLoserScore() {
        if (!this.completedAt)
            throw new Error('Cannot get loser score of incomplete set');
        else if (this.score1 == null || this.score2 == null)
            return 0;
        else
            return this.score1 < this.score2 ? this.score1 : this.score2;
    }
    // deprecated
    /*
    getBracketId() : number | string {
        if(this.data)
            return this.data.bracketId || this.nullValueString('Bracket ID');
        else throw new Error('No data to get Set property Bracket ID');
    }

    // deprecated
    getMidsizeRoundText() : string{
        if(this.data)
            return this.data.midRoundText || this.nullValueString('Midsize Round Text');
        else throw new Error('No data to get Set property Midsize Round Text');
    }
    */
    // deprecated for the time being
    /*
    getWinnersTournamentPlacement() : number | string{
        let winner = this.getWinner()
        if(winner && this.isComplete)
            return winner.getFinalPlacement() || this.nullValueString('Winner Tournament Placement');
        else throw new Error('Set must be complete to get Winner\'s tournament placement');
    }

    getLosersTournamentPlacement() : number | string{
        let loser = this.getLoser()
        if(loser && this.isComplete)
            return loser.getFinalPlacement() || this.nullValueString('Loser Tournament Placement');
        else throw new Error('Set must be complete to get Loser\'s tournament placement');
    }
    */
    // Aggregation
    async getGames() {
        Logger_1.default.info('Gettings Games for set (%s)', this.id);
        let data = await NetworkInterface_1.default.query(queries.games, { id: this.id });
        return Game_1.Game.parseFull(data);
    }
    async getAttendees() {
        Logger_1.default.info('Getting Attendees who participated in Set [%s]', this.id);
        let data = await NetworkInterface_1.default.query(queries.attendees, { id: this.id });
        let entrants = data.set.slots.map(slot => slot.entrant).filter(entrant => entrant != null);
        let participants = lodash_1.default.flatten(entrants.map(entrant => entrant.participants)).filter(participant => participant != null);
        let attendees = participants.map(participant => Attendee_1.Attendee.parse(participant));
        return attendees;
    }
    async getEntrants() {
        Logger_1.default.info('Getting Entrants who participated in Set [%s]', this.id);
        let data = await NetworkInterface_1.default.query(queries.entrants, { id: this.id });
        let entrantData = data.set.slots.map(slot => slot.entrant).filter(entrant => entrant != null);
        let entrants = entrantData.map(entrant => Entrant_1.Entrant.parse(entrant));
        return entrants;
    }
    // Statics
    static filterOutDQs(sets) {
        Logger_1.default.debug('GGSet.filterOutDQs called');
        let displayScores = sets.map(set => set.displayScore);
        return displayScores.includes('DQ') ? sets.filter(set => set.displayScore != 'DQ') : sets;
    }
    static filterOutByes(sets) {
        Logger_1.default.debug('GGSet.filterOutByes called');
        let displayScores = sets.map(set => set.displayScore);
        return displayScores.includes('BYE') ? sets.filter(set => set.displayScore != 'BYE') : sets;
    }
    static filterOutResets(sets) {
        Logger_1.default.debug('GGSet.filterOutResets called');
        let fullRoundTexts = sets.map(set => set.fullRoundText);
        return fullRoundTexts.includes('Grand Final Reset') ? sets.filter(set => set.fullRoundText !== 'Grand Final Reset') : sets;
    }
    static filterForCompleteSets(sets) {
        Logger_1.default.debug('GGSet.filterForCompleteSets called');
        return sets.filter(set => set.getIsComplete());
    }
    static filterForIncompleteSets(sets) {
        Logger_1.default.debug('GGSet.filterForCompleteSets called');
        return sets.filter(set => !set.getIsComplete());
    }
    static filterForXMinutesBack(sets, minutesBack) {
        Logger_1.default.debug('GGSet.filterForCompleteSets called');
        let now = moment_timezone_1.default();
        let filtered = sets.filter(set => {
            let then = moment_timezone_1.default(set.getCompletedAt());
            let diff = moment_timezone_1.default.duration(now.diff(then));
            let diffMinutes = diff.minutes();
            if (diff.hours() > 0 || diff.days() > 0 || diff.months() > 0 || diff.years() > 0)
                return false;
            else
                return diffMinutes <= minutesBack && diffMinutes >= 0 && set.getIsComplete();
        });
        return filtered;
    }
}
exports.GGSet = GGSet;
var IGGSet;
(function (IGGSet) {
    class PlayerLite {
        constructor(tag, entrantId, attendeeIds) {
            this.tag = tag;
            this.entrantId = entrantId;
            this.attendeeIds = attendeeIds;
        }
        static parse(tag, slot) {
            let entrantId = slot.entrant ? slot.entrant.id : null;
            let attendeeIds = slot.entrant ? slot.entrant.participants.map(p => p.id) : [];
            return new PlayerLite(tag, entrantId, attendeeIds);
        }
    }
    IGGSet.PlayerLite = PlayerLite;
    function getDefaultSetOptions() {
        return {
            page: 1,
            perPage: null,
            sortBy: null,
            filters: null
        };
    }
    IGGSet.getDefaultSetOptions = getDefaultSetOptions;
})(IGGSet = exports.IGGSet || (exports.IGGSet = {}));
