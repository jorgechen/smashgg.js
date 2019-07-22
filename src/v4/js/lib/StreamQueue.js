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
const Logger_1 = __importDefault(require("./util/Logger"));
const NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
const queries = __importStar(require("./scripts/streamQueueQueries"));
const Stream_1 = require("./Stream");
const GGSet_1 = require("./GGSet");
class StreamQueue {
    constructor(stream, sets) {
        this.stream = stream;
        this.sets = sets;
    }
    static parse(data) {
        let stream = Stream_1.Stream.parse(data.stream);
        let sets = data.sets.map(set => GGSet_1.GGSet.parse(set));
        return new StreamQueue(stream, sets);
    }
    static parseFull(data) {
        return data.streamQueue.map(sq => StreamQueue.parse(sq));
    }
    static async get(tournamentId) {
        Logger_1.default.info('Getting Stream Queues for Tournament with Id %s', tournamentId);
        let data = await NetworkInterface_1.default.query(queries.streamQueue, { tournamentId: tournamentId });
        if (data.streamQueue)
            return StreamQueue.parseFull(data);
        else {
            Logger_1.default.warn('Stream Queue for tournament %s is null', tournamentId);
            return null;
        }
    }
    getStream() {
        return this.stream;
    }
    getSets() {
        return this.sets;
    }
}
exports.StreamQueue = StreamQueue;
