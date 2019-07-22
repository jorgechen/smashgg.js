"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Seed {
    constructor(id, entrantId, placeholderName, seedNumber, placement, isBye) {
        this.id = id;
        this.entrantId = entrantId;
        this.placeholderName = placeholderName;
        this.seedNumber = seedNumber;
        this.placement = placement;
        this.isBye = isBye;
    }
    static parse(data) {
        return new Seed(data.id, data.entrantId, data.placeholderName, data.seedNumber, data.placement, data.isBye);
    }
    static parseFull(data) {
        return data.seed.map(seedData => Seed.parse(seedData));
    }
}
exports.Seed = Seed;
var ISeed;
(function (ISeed) {
    function getDefaultSeedOptions() {
        return {
            page: 1,
            perPage: 1,
            sortBy: null,
            filter: null
        };
    }
    ISeed.getDefaultSeedOptions = getDefaultSeedOptions;
})(ISeed = exports.ISeed || (exports.ISeed = {}));
