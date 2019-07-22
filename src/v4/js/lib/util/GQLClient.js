"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const TokenHandler_1 = __importDefault(require("./TokenHandler"));
const API_URL = process.env.ApiUrl || 'https://api.smash.gg/gql/alpha';
class GQLClient {
    static getApiUrl() {
        return API_URL;
    }
    static getHeaders() {
        let token = TokenHandler_1.default.getToken();
        if (!token)
            throw new Error('Cannot initialize without a token for smash.gg');
        return {
            headers: {
                'X-Source': 'smashgg.js',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
    }
    static getInstance() {
        if (!GQLClient.instance) {
            GQLClient.instance = new graphql_request_1.GraphQLClient(API_URL, GQLClient.getHeaders());
        }
        return GQLClient.instance;
    }
}
exports.default = GQLClient;
