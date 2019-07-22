"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entrant_1 = require("./Entrant");
class Standing {
    constructor(id, placement, entrant, stats) {
        this.id = id;
        this.placement = placement;
        this.entrant = entrant;
        this.stats = stats;
    }
    static parse(data, eventId = -1) {
        return new Standing(data.id, data.placement, Entrant_1.Entrant.parse(data.entrant), StandingStats.parse(data.stats));
    }
}
exports.Standing = Standing;
class StandingStats {
    constructor(score) {
        this.score = score;
    }
    static parse(data) {
        return new StandingStats(data.score);
    }
}
exports.StandingStats = StandingStats;
