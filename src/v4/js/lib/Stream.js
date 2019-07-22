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
const queries = __importStar(require("./scripts/streamQueries"));
class Stream {
    constructor(id, eventId, tournamentId, streamName, numSetups, streamSource, streamType, streamTypeId, isOnline, enabled, followerCount, removesTasks, streamStatus, streamGame, streamLogo) {
        this.id = id;
        this.eventId = eventId;
        this.tournamentId = tournamentId;
        this.streamName = streamName;
        this.numSetups = numSetups;
        this.streamSource = streamSource;
        this.streamType = streamType;
        this.streamTypeId = streamTypeId;
        this.isOnline = isOnline;
        this.enabled = enabled;
        this.followerCount = followerCount;
        this.removesTasks = removesTasks;
        this.streamStatus = streamStatus;
        this.streamGame = streamGame;
        this.streamLogo = streamLogo;
    }
    static parse(data) {
        return new Stream(data.id, data.eventId, data.tournamentId, data.streamName, data.numSetups, data.streamSource, data.streamType, data.streamTypeId, data.isOnline, data.enabled, data.followerCount, data.removesTasks, data.streamStatus, data.streamGame, data.streamLogo);
    }
    static parseFull(data) {
        return Stream.parse(data.stream);
    }
    static async get(id) {
        Logger_1.default.info('Getting Stream with Id %s', id);
        let data = await NetworkInterface_1.default.query(queries.stream, { id: id });
        return Stream.parseFull(data);
    }
    getId() {
        return this.id;
    }
    getEventId() {
        return this.eventId;
    }
    getTournamentId() {
        return this.tournamentId;
    }
    getStreamName() {
        return this.streamName;
    }
    getNumSetups() {
        return this.numSetups;
    }
    getStreamSource() {
        return this.streamSource;
    }
    getStreamType() {
        return this.streamType;
    }
    getStreamTypeId() {
        return this.streamTypeId;
    }
    getIsOnline() {
        return this.isOnline;
    }
    getEnabled() {
        return this.enabled;
    }
    getFollowerCount() {
        return this.followerCount;
    }
    getRemovesTasks() {
        return this.removesTasks;
    }
    getStreamStatus() {
        return this.streamStatus;
    }
    getStreamGame() {
        return this.streamGame;
    }
    getStreamLogo() {
        return this.streamLogo;
    }
}
exports.Stream = Stream;
