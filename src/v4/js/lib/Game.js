"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class Game {
    constructor(id, state, winnerId, orderNumber, selections) {
        this.id = id;
        this.state = state;
        this.winnerId = winnerId;
        this.orderNumber = orderNumber;
        this.selections = selections;
    }
    static parse(data) {
        return new Game(+data.id, data.state, data.winnerId, data.orderNum, Selections.parseArray(data.selections));
    }
    static parseFull(data) {
        return data.set.games.map(gameData => Game.parse(gameData));
    }
    getId() {
        return this.id;
    }
    getState() {
        return this.state;
    }
    getWinnerId() {
        return this.winnerId;
    }
    getOrderNumber() {
        return this.orderNumber;
    }
    getSelections() {
        return this.selections;
    }
    getSelectionsForEntrantId(entrantId) {
        return lodash_1.default.find(this.selections, { entrantId: entrantId });
    }
}
exports.Game = Game;
class Selections {
    constructor(selectionType, selectionValue, entrantId, participantId) {
        this.selectionType = selectionType;
        this.selectionValue = selectionValue;
        this.entrantId = entrantId;
        this.attendeeId = participantId;
    }
    static parse(data) {
        return new Selections(data.selectionType, data.selectionValue, data.entrantId, data.participantId);
    }
    static parseArray(data) {
        return data.map(e => Selections.parse(e));
    }
    static parseFull(data) {
        return data.selections.map(selectionsData => Selections.parse(selectionsData));
    }
    getSelectionType() {
        return this.selectionType;
    }
    getSelectionValue() {
        return this.selectionValue;
    }
    getEntrantId() {
        return this.entrantId;
    }
    getAttendeeId() {
        return this.attendeeId;
    }
}
exports.Selections = Selections;
