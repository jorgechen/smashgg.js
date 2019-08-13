"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Selections = /** @class */ (function () {
    function Selections(selectionType, selectionValue, entrantId, participantId) {
        this.selectionType = selectionType;
        this.selectionValue = selectionValue;
        this.entrantId = entrantId;
        this.attendeeId = participantId;
    }
    Selections.parse = function (data) {
        return new Selections(data.selectionType, data.selectionValue, data.entrantId, data.participantId);
    };
    Selections.parseArray = function (data) {
        return data.map(function (e) { return Selections.parse(e); });
    };
    Selections.parseFull = function (data) {
        return data.selections.map(function (selectionsData) { return Selections.parse(selectionsData); });
    };
    Selections.prototype.getSelectionType = function () {
        return this.selectionType;
    };
    Selections.prototype.getSelectionValue = function () {
        return this.selectionValue;
    };
    Selections.prototype.getEntrantId = function () {
        return this.entrantId;
    };
    Selections.prototype.getAttendeeId = function () {
        return this.attendeeId;
    };
    return Selections;
}());
exports.Selections = Selections;
