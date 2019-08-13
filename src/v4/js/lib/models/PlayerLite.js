"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerLite = /** @class */ (function () {
    function PlayerLite(tag, entrantId, attendeeIds) {
        this.tag = tag;
        this.entrantId = entrantId;
        this.attendeeIds = attendeeIds;
    }
    PlayerLite.parse = function (tag, slot) {
        var entrantId = slot.entrant ? slot.entrant.id : null;
        var attendeeIds = slot.entrant ? slot.entrant.participants.map(function (p) { return p.id; }) : [];
        return new PlayerLite(tag, entrantId, attendeeIds);
    };
    return PlayerLite;
}());
exports.PlayerLite = PlayerLite;
