"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entrant_1 = require("./Entrant");
var StandingStats_1 = require("./StandingStats");
var Standing = /** @class */ (function () {
    function Standing(id, placement, entrant, stats) {
        this.id = id;
        this.placement = placement;
        this.entrant = entrant;
        this.stats = stats;
    }
    Standing.getDefaultOptions = function () {
        return {
            perPage: 1,
            page: null,
            sortBy: null,
            filter: null
        };
    };
    Standing.parse = function (data) {
        return new Standing(data.id, data.placement, Entrant_1.Entrant.parse(data.entrant), StandingStats_1.StandingStats.parse(data.stats));
    };
    Standing.prototype.getId = function () {
        return this.id;
    };
    Standing.prototype.getPlacement = function () {
        return this.placement;
    };
    Standing.prototype.getEntrant = function () {
        return this.entrant;
    };
    Standing.prototype.getGamerTag = function () {
        if (this.entrant)
            return this.entrant.getAttendee().getGamerTag();
        return null;
    };
    return Standing;
}());
exports.Standing = Standing;
