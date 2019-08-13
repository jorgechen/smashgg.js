"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StandingStats = /** @class */ (function () {
    function StandingStats(score) {
        this.score = score;
    }
    StandingStats.parse = function (data) {
        return new StandingStats(data.score);
    };
    StandingStats.prototype.getScore = function () {
        return this.score;
    };
    return StandingStats;
}());
exports.StandingStats = StandingStats;
