"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Seed = /** @class */ (function () {
    function Seed(id, entrantId, placeholderName, seedNumber, placement, isBye) {
        this.id = id;
        this.entrantId = entrantId;
        this.placeholderName = placeholderName;
        this.seedNumber = seedNumber;
        this.placement = placement;
        this.isBye = isBye;
    }
    Seed.parse = function (data) {
        return new Seed(data.id, data.entrantId, data.placeholderName, data.seedNumber, data.placement, data.isBye);
    };
    Seed.parseFull = function (data) {
        return data.seed.map(function (seedData) { return Seed.parse(seedData); });
    };
    Seed.getDefaultSeedOptions = function () {
        return {
            page: null,
            perPage: 1,
            sortBy: null,
            filter: null
        };
    };
    Seed.prototype.getId = function () {
        return this.id;
    };
    Seed.prototype.getEntrantId = function () {
        return this.entrantId;
    };
    Seed.prototype.getPlaceholderName = function () {
        return this.placeholderName;
    };
    Seed.prototype.getSeedNumber = function () {
        return this.seedNumber;
    };
    Seed.prototype.getPlacement = function () {
        return this.placement;
    };
    Seed.prototype.getIsBye = function () {
        return this.isBye;
    };
    return Seed;
}());
exports.Seed = Seed;
