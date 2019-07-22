"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./util/Logger"));
const request_promise_1 = __importDefault(require("request-promise"));
const util_1 = require("util");
const Cache_1 = __importDefault(require("./util/Cache"));
const VideoGame_1 = require("./VideoGame");
const Common_1 = require("./util/Common");
var parseOptions = Common_1.ICommon.parseOptions;
const API_URL = 'https://api.smash.gg/characters';
class Character {
    constructor(id, name, isCommon, videogameId) {
        this.id = 0;
        this.name = '';
        this.isCommon = true;
        this.videogameId = 1;
        this.id = id;
        this.name = name;
        this.isCommon = isCommon;
        this.videogameId = videogameId;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getIsCommon() {
        return this.isCommon;
    }
    getVideoGameId() {
        return this.videogameId;
    }
    static async getAll(options = {}) {
        Logger_1.default.debug('getAll called');
        try {
            // parse options
            options = parseOptions(options);
            let cacheKey = 'character::all';
            if (options.isCached) {
                let cached = await Cache_1.default.getInstance().get(cacheKey);
                if (cached)
                    return cached;
            }
            let req = {
                uri: API_URL,
                headers: {
                    'X-SOURCE': 'smashgg.js'
                },
                method: 'GET'
            };
            let data = JSON.parse(await request_promise_1.default(req));
            let characters = data.entities.character.map(e => {
                return new Character(e.id, e.name, e.isCommon, e.videogameId);
            });
            if (options.isCached)
                await Cache_1.default.getInstance().set(cacheKey, characters);
            return characters;
        }
        catch (e) {
            Logger_1.default.error('getAll error: %s', e);
            throw e;
        }
    }
    static async getById(id, options = {}) {
        Logger_1.default.debug('Character.getById called');
        try {
            // parse options
            options = parseOptions(options);
            let cacheKey = util_1.format('character::id::%s', id);
            if (options.isCached) {
                let cached = await Cache_1.default.getInstance().get(cacheKey);
                if (cached)
                    return cached;
            }
            let characters = await Character.getAll(options);
            let match = characters.filter(e => { return e.id === id; });
            let character = match.length > 0 ? match[0] : undefined;
            if (options.isCached)
                await Cache_1.default.getInstance().set(cacheKey, characters);
            return character;
        }
        catch (e) {
            Logger_1.default.error('Character.getById error: %s', e);
            throw e;
        }
    }
    static async getByGameId(id, options = {}) {
        Logger_1.default.debug('Character.getByGameId called');
        try {
            // parse options
            options = parseOptions(options);
            let cacheKey = util_1.format('character::videogameId::%s', id);
            if (options.isCached) {
                let cached = await Cache_1.default.getInstance().get(cacheKey);
                if (cached)
                    return cached;
            }
            let characters = await Character.getAll(options);
            characters = characters.filter(e => { return e.videogameId === id; });
            if (options.isCached)
                await Cache_1.default.getInstance().set(cacheKey, characters);
            return characters;
        }
        catch (e) {
            Logger_1.default.error('Character.getByGameId error: %s', e);
            throw e;
        }
    }
    static async getByGameName(name, options = {}) {
        Logger_1.default.debug('Character.getByGameName called');
        try {
            // parse options
            options = parseOptions(options);
            let cacheKey = util_1.format('character::videgameName::%s', name);
            if (options.isCached) {
                let cached = await Cache_1.default.getInstance().get(cacheKey);
                if (cached)
                    return cached;
            }
            let videoGame = await VideoGame_1.VideoGame.getByName(name, options);
            if (!videoGame)
                throw new Error('No game by the name ' + name);
            let character = await Character.getByGameId(videoGame.id, options);
            if (options.isCached)
                await Cache_1.default.getInstance().set(cacheKey, character);
            return character;
        }
        catch (e) {
            Logger_1.default.error('Character.getByGameName error: %s', e);
            throw e;
        }
    }
    static async getByName(name, options = {}) {
        Logger_1.default.debug('Characters.getByName called');
        try {
            // parse options
            options = parseOptions(options);
            let cacheKey = util_1.format('characters::name::%s', name);
            if (options.isCached) {
                let cached = await Cache_1.default.getInstance().get(cacheKey);
                if (cached)
                    return cached;
            }
            let characters = await Character.getAll(options);
            characters = characters.filter(e => {
                return e.name.toLowerCase() === name.toLowerCase();
            });
            if (options.isCached)
                await Cache_1.default.getInstance().set(cacheKey, characters);
            return characters;
        }
        catch (e) {
            Logger_1.default.error('Characters.getByName error: %s', e);
            throw e;
        }
    }
    static async getByNameAndGameId(name, videogameId, options = {}) {
        Logger_1.default.debug('Character.getByNameAndGame called');
        try {
            // parse options
            options = parseOptions(options);
            let cacheKey = util_1.format('characters::name::%s::videogameId::%s', name, videogameId);
            if (options.isCached) {
                let cached = await Cache_1.default.getInstance().get(cacheKey);
                if (cached)
                    return cached;
            }
            let characters = await Character.getByName(name, options);
            let match = characters.filter(e => { return e.videogameId == videogameId; });
            let character = match.length > 0 ? match[0] : undefined;
            if (options.isCached)
                await Cache_1.default.getInstance().set(cacheKey, character);
            return character;
        }
        catch (e) {
            Logger_1.default.error('Character.getByNameAndGame error: %s', e);
            throw e;
        }
    }
    static async getByNameAndGame(name, gameName, options = {}) {
        Logger_1.default.debug('Character.getByNameAndGame called');
        try {
            // parse options
            let isCached = options.isCached != undefined ? options.isCached == true : true;
            let cacheKey = util_1.format('characters::name::%s::game::%s', name, gameName);
            if (isCached) {
                let cached = await Cache_1.default.getInstance().get(cacheKey);
                if (cached)
                    return cached;
            }
            let characters = await Character.getByName(name, options);
            let videogame = await VideoGame_1.VideoGame.getByName(gameName, options);
            let match = characters.filter(e => { return e.videogameId == videogame.id; });
            let character = match.length > 0 ? match[0] : undefined;
            await Cache_1.default.getInstance().set(cacheKey, character);
            return character;
        }
        catch (e) {
            Logger_1.default.error('Character.getByNameAndGame error: %s', e);
            throw e;
        }
    }
}
exports.Character = Character;
Character.prototype.toString = function () {
    return 'Character: ' +
        '\nName: ' + this.name +
        '\nID: ' + this.id +
        '\nVideoGame ID: ' + this.videogameId +
        '\nIs Common? ' + this.isCommon;
};
