"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenRegex = new RegExp(/[a-f0-9]{32}/);
class TokenHandler {
    static setToken(token) {
        if (!tokenRegex.test(token))
            throw new Error(`Invalid token '${token}'. Must be 32 lowercase, hexidecimal characters.`);
        TokenHandler.token = token;
    }
    static getToken() {
        return TokenHandler.token;
    }
}
exports.default = TokenHandler;
module.exports = TokenHandler;
