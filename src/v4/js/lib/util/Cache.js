'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./Logger"));
const node_cache_1 = __importDefault(require("node-cache"));
const bluebird_1 = require("bluebird");
const TTL = process.env.CacheTTL || 600;
const CHECK_PERIOD = process.env.CacheCheckPeriod || 60;
class Cache {
    static init() {
        if (!Cache.initialized) {
            Cache.instance = bluebird_1.promisifyAll(new node_cache_1.default({
                stdTTL: +TTL,
                checkperiod: +CHECK_PERIOD
            }));
            Cache.initialized = true;
        }
    }
    static getInstance() {
        if (!Cache.instance) {
            Cache.instance = new node_cache_1.default({
                stdTTL: 600,
                checkperiod: 60
            });
        }
        return Cache.instance;
    }
    static get(key) {
        return new Promise(function (resolve, reject) {
            Logger_1.default.debug('Fetching (%s) from cache', key);
            Cache.getInstance().get(key, function (err, value) {
                if (err)
                    return reject(err);
                else
                    return resolve(value);
            });
        });
    }
    static set(key, val) {
        return new Promise(function (resolve, reject) {
            Logger_1.default.debug('Setting (%s) to value [%s]', key, val);
            Cache.getInstance().set(key, val, function (err, success) {
                if (success)
                    return resolve(success);
                else
                    return reject(new Error('Error setting cache value'));
            });
        });
    }
    static keys() {
        return new Promise(function (resolve, reject) {
            Logger_1.default.debug('returning keys');
            Cache.getInstance().keys(function (err, keys) {
                if (err) {
                    Logger_1.default.error('Console.keys: ' + err);
                    return reject(err);
                }
                else
                    resolve(keys);
            });
        });
    }
    static flush() {
        Logger_1.default.debug('flushing cache');
        Cache.getInstance().flushAll();
    }
}
Cache.initialized = false;
exports.default = Cache;
