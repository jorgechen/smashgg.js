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
/** aka User **/
const NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
const GGSet_1 = require("./GGSet");
const Common = __importStar(require("./util/Common"));
const queries = __importStar(require("./scripts/userQueries"));
const Logger_1 = __importDefault(require("./util/Logger"));
class User {
    constructor(id, gamerTag, prefix, color, twitchStream, twitterHandle, youtube, region, state, country, gamerTagChangedAt) {
        this.id = id;
        this.gamerTag = gamerTag;
        this.prefix = prefix;
        this.color = color;
        this.twitchStream = twitchStream;
        this.twitterHandle = twitterHandle;
        this.youtube = youtube;
        this.region = region;
        this.state = state;
        this.country = country;
        this.gamerTagChangedAt = gamerTagChangedAt;
    }
    static parse(data) {
        return new User(data.id, data.gamerTag, data.prefix, data.color, data.twitchStream, data.twitterHandle, data.youtube, data.region, data.state, data.country, data.gamerTagChangedAt);
    }
    static parseFull(data) {
        return User.parse(data.player);
    }
    static async getById(id) {
        Logger_1.default.info('Getting User (smash.gg Player) with id %s', id);
        let data = await NetworkInterface_1.default.query(queries.user, { id: id });
        return User.parseFull(data);
    }
    getId() {
        return this.id;
    }
    getGamerTag() {
        return this.gamerTag;
    }
    getSponsor() {
        return this.prefix;
    }
    getColor() {
        return this.color;
    }
    getTwitchStream() {
        return this.twitchStream;
    }
    getTwitterHandle() {
        return this.twitterHandle;
    }
    getYoutube() {
        return this.youtube;
    }
    getRegion() {
        return this.region;
    }
    getState() {
        return this.state;
    }
    getCountry() {
        return this.country;
    }
    getGamerTagChangedAt() {
        return this.gamerTagChangedAt ? Common.convertEpochToDate(this.gamerTagChangedAt) : null;
    }
    async getRecentSets() {
        Logger_1.default.info('Getting Sets for %s (User: %s)', this.gamerTag, this.id);
        let data = await NetworkInterface_1.default.query(queries.userRecentGGSets, { id: this.id });
        let sets = data.player.recentSets.map(setData => GGSet_1.GGSet.parse(setData));
        return sets;
    }
    async getRankings() {
        Logger_1.default.info('Getting Rankings for %s (User: %s)', this.gamerTag, this.id);
        let data = await NetworkInterface_1.default.query(queries.userRankings, { id: this.id });
        let rankings = data.player.rankings;
        return rankings;
    }
}
exports.User = User;
