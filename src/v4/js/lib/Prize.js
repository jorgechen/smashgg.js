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
    return Prize;
}());
exports.Prize = Prize;
