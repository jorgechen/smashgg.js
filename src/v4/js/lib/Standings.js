"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entrant_1 = require("./Entrant");
var Standings = /** @class */ (function () {
    function Standings(id, placement, entrant, stats) {
        this.id = id;
        this.placement = placement;
        this.entrant = entrant;
        this.stats = stats;
    }
    Standings.parse = function (data, eventId) {
        if (eventId === void 0) { eventId = -1; }
        return new Standings(data.id, data.placement, Entrant_1.Entrant.parse(data.entrant), StandingsStats.parse(data.stats));
    };
    return Standings;
}());
exports.Standings = Standings;
var StandingsStats = /** @class */ (function () {
    function StandingsStats(score) {
        this.score = score;
    }
    StandingsStats.parse = function (data) {
        return new StandingsStats(data.score);
    };
    return StandingsStats;
}());
exports.StandingsStats = StandingsStats;
