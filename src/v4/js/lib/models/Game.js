"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Selections_1 = require("./Selections");
var Game = /** @class */ (function () {
    function Game(id, state, winnerId, orderNumber, selections) {
        this.id = id;
        this.state = state;
        this.winnerId = winnerId;
        this.orderNumber = orderNumber;
        this.selections = selections;
    }
    Game.parse = function (data) {
        return new Game(+data.id, data.state, data.winnerId, data.orderNum, Selections_1.Selections.parseArray(data.selections));
    };
    Game.parseFull = function (data) {
        return data.set.games.map(function (gameData) { return Game.parse(gameData); });
    };
    Game.prototype.getId = function () {
        return this.id;
    };
    Game.prototype.getState = function () {
        return this.state;
    };
    Game.prototype.getWinnerId = function () {
        return this.winnerId;
    };
    Game.prototype.getOrderNumber = function () {
        return this.orderNumber;
    };
    Game.prototype.getSelections = function () {
        return this.selections;
    };
    Game.prototype.getSelectionsForEntrantId = function (theEntrantId) {
        return lodash_1.default.find(this.selections, { entrantId: theEntrantId });
    };
    return Game;
}());
exports.Game = Game;
