"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
require("../lib/util/ErrorHandler");
var chai_1 = __importDefault(require("chai"));
var expect = chai_1.default.expect;
var VideoGame_1 = require("../lib/VideoGame");
var Cache_1 = __importDefault(require("../lib/util/Cache"));
var expected = {
    Melee: {
        id: 1,
        data: {
            "abbrev": "Melee",
            "approved": true,
            "characterTerm": [null],
            "displayName": "Melee",
            "enabled": "1",
            "expand": [],
            "gameTerm": [null],
            "id": 1,
            "images": [
                {
                    "createdAt": [null],
                    "entity": [null],
                    "entityId": [null],
                    "height": 190,
                    "id": 6180,
                    "isOriginal": true,
                    "ratio": 0.73,
                    "type": "primary",
                    "updatedAt": [null],
                    "uploadedBy": [null],
                    "url": "https://images.smash.gg/images/videogame/1/image-f26ab87b8de31d78597a664d225e1c71.jpg",
                    "width": 138
                },
            ],
            "initialStocks": [null],
            "isCardGame": [null],
            "maxPerEntry": 2,
            "minPerEntry": 1,
            "name": "Super Smash Bros. Melee",
            "slug": "melee",
            "stageTerm": [null]
        },
        name: 'Super Smash Bros. Melee',
        abbrev: 'Melee',
        displayName: 'Melee',
        minPerEntry: 1,
        maxPerEntry: 2,
        approved: true,
        slug: 'melee',
        rawEncoding: 'json',
        isCardGame: null
    },
    PM: {
        id: 2,
        data: {
            "abbrev": "pm",
            "approved": true,
            "characterTerm": [null],
            "displayName": "PM",
            "enabled": "1",
            "expand": [],
            "gameTerm": [null],
            "id": 2,
            "images": [
                {
                    "createdAt": [null],
                    "entity": [null],
                    "entityId": [null],
                    "height": 512,
                    "id": 1330116,
                    "isOriginal": true,
                    "ratio": 0.73,
                    "type": "primary",
                    "updatedAt": [null],
                    "uploadedBy": [null],
                    "url": "https://images.smash.gg/images/videogame/2/image-11a8d11dbd2af24429b41b7e6a166f42.png",
                    "width": 372,
                },
            ],
            "initialStocks": [null],
            "isCardGame": [null],
            "maxPerEntry": [null],
            "minPerEntry": [null],
            "name": "Project M",
            "slug": "pm",
            "stageTerm": [null],
        },
        name: 'Project M',
        abbrev: 'pm',
        displayName: 'PM',
        minPerEntry: null,
        maxPerEntry: null,
        approved: true,
        slug: 'pm',
        rawEncoding: 'json',
        isCardGame: null
    }
};
function eq(original, other) {
    return other.id === original.id &&
        other.name === original.name &&
        other.abbrev === original.abbrev &&
        other.displayName === original.displayName &&
        other.minPerEntry === original.minPerEntry &&
        other.maxPerEntry === original.maxPerEntry &&
        other.approved === original.approved &&
        other.slug === original.slug &&
        other.rawEncoding === original.rawEncoding &&
        other.isCardGame === original.isCardGame;
}
describe('SmashGG VideoGame', function () {
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Cache_1.default.flush();
                return [2 /*return*/];
            });
        });
    });
    it('should get all video games from api', function () {
        return __awaiter(this, void 0, void 0, function () {
            var videoGames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, VideoGame_1.VideoGame.getAll()];
                    case 1:
                        videoGames = _a.sent();
                        videoGames.forEach(function (e) {
                            expect(e).to.be.instanceof(VideoGame_1.VideoGame);
                        });
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should get correct video game by id', function () {
        return __awaiter(this, void 0, void 0, function () {
            var vg1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, VideoGame_1.VideoGame.getById(1)];
                    case 1:
                        vg1 = _a.sent();
                        expect(eq(expected.Melee, vg1)).to.be.true;
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should get correct video game by id 2', function () {
        return __awaiter(this, void 0, void 0, function () {
            var vg2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, VideoGame_1.VideoGame.getById(2)];
                    case 1:
                        vg2 = _a.sent();
                        expect(eq(expected.PM, vg2)).to.be.true;
                        return [2 /*return*/, true];
                }
            });
        });
    });
    it('should get correct video game by name', function () {
        return __awaiter(this, void 0, void 0, function () {
            var melee1, melee2, pm1, pm2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, VideoGame_1.VideoGame.getByName('Super Smash Bros. Melee', { isCached: false })];
                    case 1:
                        melee1 = _a.sent();
                        return [4 /*yield*/, VideoGame_1.VideoGame.getByName('melee', { isCached: false })];
                    case 2:
                        melee2 = _a.sent();
                        return [4 /*yield*/, VideoGame_1.VideoGame.getByName('pm')];
                    case 3:
                        pm1 = _a.sent();
                        return [4 /*yield*/, VideoGame_1.VideoGame.getByName('Project M')];
                    case 4:
                        pm2 = _a.sent();
                        expect(eq(expected.Melee, melee1)).to.be.true;
                        expect(eq(expected.Melee, melee2)).to.be.true;
                        expect(eq(expected.PM, pm1)).to.be.true;
                        expect(eq(expected.PM, pm2)).to.be.true;
                        return [2 /*return*/, true];
                }
            });
        });
    });
});
