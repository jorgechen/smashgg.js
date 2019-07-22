"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const NetworkInterface_1 = __importDefault(require("./util/NetworkInterface"));
const queries = __importStar(require("./scripts/tournamentQueries"));
class Organizer {
    constructor(id, email, phone, twitter, info) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.twitter = twitter;
        this.info = info;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getPhone() {
        return this.phone;
    }
    getTwitter() {
        return this.twitter;
    }
    getInfo() {
        return this.info;
    }
    static parse(data) {
        let venue = new Organizer(data.data.tournament.ownerId, data.data.tournament.contactEmail, data.data.tournament.contactPhone, data.data.tournament.contactTwitter, data.data.tournament.contactInfo);
        return venue;
    }
    static async getByTournament(tournamentSlug) {
        let data = await NetworkInterface_1.default.query(queries.tournamentOrganizer, { slug: tournamentSlug });
        return Organizer.parse(data);
    }
}
exports.Organizer = Organizer;
