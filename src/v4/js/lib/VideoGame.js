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
const request_promise_1 = __importDefault(require("request-promise"));
const util_1 = require("util");
const Cache_1 = __importDefault(require("./util/Cache"));
const Common_1 = require("./util/Common");
const Logger_1 = __importDefault(require("./util/Logger"));
var parseOptions = Common_1.ICommon.parseOptions;
const lodash_1 = __importDefault(require("lodash"));
const NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
const queries = __importStar(require("./scripts/tournamentQueries"));
const API_URL = 'https://api.smash.gg/public/videogames';
//const LEGAL_ENCODINGS = ['json', 'utf8', 'base64'];
//const DEFAULT_ENCODING = 'json';
class VideoGame {
    constructor(id, name, abbrev, displayName, minPerEntry, maxPerEntry, approved, slug, isCardGame) {
        this.id = 0;
        this.data = '';
        this.rawEncoding = 'json';
        this.id = id;
        this.name = name;
        this.abbrev = abbrev;
        this.displayName = displayName;
        this.minPerEntry = minPerEntry;
        this.maxPerEntry = maxPerEntry;
        this.approved = approved;
        this.slug = slug;
        this.isCardGame = isCardGame;
    }
    loadData(data, encoding) {
        let encoded = encoding == 'json' ? data : new Buffer(JSON.stringify(data)).toString(encoding);
        this.data = encoded;
        return encoded;
    }
    getData(data, encoding) {
        let decoded = this.rawEncoding == 'json' ? data : JSON.parse(new Buffer(data.toString(), encoding).toString('utf8'));
        return decoded;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getAbbreviation() {
        return this.abbrev;
    }
    getDisplayName() {
        return this.displayName;
    }
    getMinPerEntry() {
        return this.minPerEntry;
    }
    getMaxPerEntry() {
        return this.maxPerEntry;
    }
    getApproved() {
        return this.approved;
    }
    getSlug() {
        return this.slug;
    }
    getIsCardGame() {
        return this.isCardGame;
    }
    static resolve(data) {
        let vg = new VideoGame(data.id, data.name, data.abbrev, data.displayName, data.minPerEntry, data.maxPerEntry, data.approved, data.slug, data.isCardGame);
        vg.loadData(data, 'json');
        return vg;
    }
    static async getAll(options = {}) {
        Logger_1.default.debug('VideoGames getAll called');
        try {
            // parse options
            options = parseOptions(options);
            let cacheKey = 'videoGames::all';
            if (options.isCached) {
                let cached = await Cache_1.default.getInstance().get(cacheKey);
                if (cached)
                    return cached;
            }
            let data = JSON.parse(await request_promise_1.default(API_URL));
            let videoGames = data.entities.videogame.map(vg => VideoGame.resolve(vg));
            if (options.isCached)
                await Cache_1.default.getInstance().set(cacheKey, videoGames);
            return videoGames;
        }
        catch (e) {
            Logger_1.default.error('VideoGames getAll error: %s', e);
            throw e;
        }
    }
    static async getById(id, options = {}) {
        Logger_1.default.debug('VideoGame getById called [%s]', id);
        try {
            // parse options
            options = parseOptions(options);
            let cacheKey = util_1.format('VideoGame::id::%s', id);
            if (options.isCached) {
                let cached = await Cache_1.default.getInstance().get(cacheKey);
                if (cached)
                    return cached;
            }
            let data = await VideoGame.getAll(options);
            let videoGames = data.filter(vg => { return vg.id === id; });
            if (videoGames.length <= 0)
                throw new Error('No video game with id ' + id);
            let videoGame = videoGames[0];
            if (options.isCached)
                Cache_1.default.getInstance().set(cacheKey, videoGame);
            return videoGame;
        }
        catch (e) {
            Logger_1.default.error('VideoGame getById error: %s', e);
            throw e;
        }
    }
    static async getByName(name, options = {}) {
        Logger_1.default.debug('VideoGame getByName called [%s]', name);
        try {
            // parse options
            let isCached = options.isCached || true;
            let cacheKey = util_1.format('VideoGame::name::%s', name);
            if (isCached) {
                let cached = await Cache_1.default.getInstance().get(cacheKey);
                if (cached)
                    return cached;
            }
            let data = await VideoGame.getAll();
            let videoGames = data.filter(vg => {
                return vg.name === name ||
                    vg.abbrev === name ||
                    vg.slug === name ||
                    vg.displayName === name;
            });
            if (videoGames.length <= 0)
                throw new Error('No video game with name ' + name);
            let videoGame = videoGames[0];
            if (isCached)
                Cache_1.default.getInstance().set(cacheKey, videoGame);
            return videoGame;
        }
        catch (e) {
            Logger_1.default.error('VideoGame getByName error: %s', e);
            throw e;
        }
    }
    static async getTournamentsRaw(filter, options = IVideoGame.getDefaultTournamentOptions()) {
        const data = await NetworkInterface_1.default.paginatedQuery(`Finding tournaments with filter:${JSON.stringify(filter)}`, queries.tournaments, { filter }, options, {}, 3);
        const setData = lodash_1.default.flatten(data.map(d => d.tournaments.nodes));
        return setData;
    }
}
exports.VideoGame = VideoGame;
var IVideoGame;
(function (IVideoGame) {
    function getDefaultTournamentOptions() {
        return {
            page: 1,
            perPage: null,
            sortBy: null,
            filters: null
        };
    }
    IVideoGame.getDefaultTournamentOptions = getDefaultTournamentOptions;
})(IVideoGame = exports.IVideoGame || (exports.IVideoGame = {}));
