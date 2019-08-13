"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
var Logger_1 = __importDefault(require("./Logger"));
function errHandle(e) {
    Logger_1.default.error(e.message.red);
    Logger_1.default.error(e);
}
process.on('error', errHandle);
process.on('unhandledRejection', errHandle);
process.on('uncaughtException', errHandle);
