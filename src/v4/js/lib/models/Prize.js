"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Prize = /** @class */ (function () {
    function Prize(markdown, payoutType, payoutTotal, prizing) {
        this.markdown = markdown;
        this.payoutType = payoutType;
        this.payoutTotal = payoutTotal;
        this.prizing = prizing;
    }
    Prize.parse = function (data) {
        return null;
    };
    Prize.prototype.getMarkdown = function () {
        return this.markdown;
    };
    Prize.prototype.getPayoutType = function () {
        return this.payoutType;
    };
    Prize.prototype.getPayoutTotal = function () {
        return this.payoutTotal;
    };
    Prize.prototype.getPrizing = function () {
        return this.prizing;
    };
    return Prize;
}());
exports.Prize = Prize;
