"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueueItem = /** @class */ (function () {
    function QueueItem(item, timestamp) {
        this.item = item;
        this.timestamp = timestamp;
        this.isExecuted = false;
    }
    QueueItem.prototype.execute = function () {
        this.item();
        this.isExecuted = true;
    };
    return QueueItem;
}());
exports.default = QueueItem;
