"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const smashggJsLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        queries: 5
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        verbose: 'blue',
        debug: 'magenta',
        queries: 'cyan'
    }
};
let tempLogger = winston_1.default.createLogger({
    level: 'info',
    levels: smashggJsLevels.levels,
    format: winston_1.default.format.combine(winston_1.default.format.splat(), winston_1.default.format.simple(), winston_1.default.format.colorize()),
    transports: [
        new winston_1.default.transports.Console()
    ]
});
const queries = function (msg) {
    tempLogger.log('queries', msg);
};
const logger = Object.assign(tempLogger, { queries: queries });
exports.default = logger;
winston_1.default.addColors(smashggJsLevels.colors);
function setLogLevel(level) {
    logger.level = level;
}
exports.setLogLevel = setLogLevel;
function addLog(type, options) {
    switch (type.toLowerCase()) {
        case 'console':
            logger.add(new winston_1.default.transports.Console(options));
            break;
        case 'file':
            logger.add(new winston_1.default.transports.File(options));
            break;
        default:
            throw new Error(`${type} is not valid for addLog. Valid values: [console, file]`);
    }
}
exports.addLog = addLog;
function disableLog() {
    logger.transports.forEach(transport => {
        transport.silent = true;
    });
}
exports.disableLog = disableLog;
function enableLog() {
    logger.transports.forEach(transport => {
        transport.silent = false;
    });
}
exports.enableLog = enableLog;
exports.levels = {
    QUERIES: 'queries',
    DEBUG: 'debug',
    VERBOSE: 'verbose',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
};
