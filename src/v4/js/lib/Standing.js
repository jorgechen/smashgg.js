"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entrant_1 = require("./Entrant");
var Standing = /** @class */ (function () {
    function Standing(id, placement, entrant, stats) {
        this.id = id;
        this.placement = placement;
        this.entrant = entrant;
        this.stats = stats;
    }
    Standing.parse = function (data, eventId) {
        if (eventId === void 0) { eventId = -1; }
        return new Standing(data.id, eventId || -1, Entrant_1.Entrant.parse(data.entrant), StandingStats.parse(data.stats));
    };
    return Standing;
}());
exports.Standing = Standing;
var StandingStats = /** @class */ (function () {
    function StandingStats(score) {
        this.score = score;
    }
    StandingStats.parse = function (data) {
        return new StandingStats(data.score);
    };
    return StandingStats;
}());
exports.StandingStats = StandingStats;
