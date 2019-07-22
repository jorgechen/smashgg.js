"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Prize {
    constructor(markdown, payoutType, payoutTotal, prizing) {
        this.markdown = markdown;
        this.payoutType = payoutType;
        this.payoutTotal = payoutTotal;
        this.prizing = prizing;
    }
    static parse(data) {
        return null;
    }
}
exports.Prize = Prize;
