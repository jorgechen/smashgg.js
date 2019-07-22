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
class Venue {
    constructor(name, address, city, state, countryCode, region, postalCode, latitude, longitude) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.countryCode = countryCode;
        this.region = region;
        this.postalCode = postalCode;
        this.latitude = latitude;
        this.longitude = longitude;
    }
    getName() {
        return this.name;
    }
    getAddress() {
        return this.address;
    }
    getState() {
        return this.state;
    }
    getCity() {
        return this.city;
    }
    getCountryCode() {
        return this.countryCode;
    }
    getRegion() {
        return this.region;
    }
    getPostalCode() {
        return this.postalCode;
    }
    getLatitude() {
        return this.latitude;
    }
    getLongitude() {
        return this.longitude;
    }
    static parse(data) {
        let venue = new Venue(data.data.tournament.venueName, data.data.tournament.venueAddress, data.data.tournament.city, data.data.tournament.addrState, data.data.tournament.countryCode, data.data.tournament.region, data.data.tournament.postalCode, data.data.tournament.lat, data.data.tournament.lng);
        return venue;
    }
    static async getByTournament(tournamentSlug) {
        let data = await NetworkInterface_1.default.query(queries.tournamentVenue, { slug: tournamentSlug });
        return Venue.parse(data);
    }
}
exports.Venue = Venue;
