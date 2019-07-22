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
const path_1 = __importDefault(require("path"));
const ROOT = path_1.default.join(__dirname, '..', '..', '..', '..', '.env');
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: ROOT });
require("../lib/util/ErrorHandler");
const chai_1 = require("chai");
const Game_1 = require("../lib/Game");
const Initializer_1 = __importDefault(require("../lib/util/Initializer"));
const testData = __importStar(require("./data/games.testData"));
let games1, games2, games3;
let selections1, selections2, selections3;
describe('smash.gg Game', function () {
    before(async function () {
        await Initializer_1.default(process.env.API_TOKEN);
        games1 = Game_1.Game.parseFull(testData.games1Full);
        games2 = Game_1.Game.parseFull(testData.games2Full);
        games3 = Game_1.Game.parseFull(testData.games3Full);
        selections1 = Game_1.Selections.parse(testData.selectionsS1G1P2);
        selections2 = Game_1.Selections.parse(testData.selectionsS1G2P2);
        selections3 = Game_1.Selections.parse(testData.selectionsS1G3P2);
        return true;
    });
    // id
    it('should return the id of a game 1', function () {
        for (var i = 0; i < games1.length; i++) {
            let game = games1[i];
            chai_1.expect(game.getId()).to.be.equal(+testData.games1[i].id);
        }
    });
    it('should return the id of a game 2', function () {
        for (var i = 0; i < games2.length; i++) {
            let game = games2[i];
            chai_1.expect(game.getId()).to.be.equal(+testData.games2[i].id);
        }
    });
    it('should return the id of a game 3', function () {
        for (var i = 0; i < games3.length; i++) {
            let game = games3[i];
            chai_1.expect(game.getId()).to.be.equal(+testData.games3[i].id);
        }
    });
    // state
    it('should return the state of a game 1', function () {
        for (var i = 0; i < games1.length; i++) {
            let game = games1[i];
            chai_1.expect(game.getState()).to.be.equal(testData.games1[i].state);
        }
    });
    it('should return the state of a game 2', function () {
        for (var i = 0; i < games2.length; i++) {
            let game = games2[i];
            chai_1.expect(game.getState()).to.be.equal(testData.games2[i].state);
        }
    });
    it('should return the state of a game 3', function () {
        for (var i = 0; i < games3.length; i++) {
            let game = games3[i];
            chai_1.expect(game.getState()).to.be.equal(testData.games3[i].state);
        }
    });
    // winner id
    it('should return the winner id of a game 1', function () {
        for (var i = 0; i < games1.length; i++) {
            let game = games1[i];
            chai_1.expect(game.getWinnerId()).to.be.equal(testData.games1[i].winnerId);
        }
    });
    it('should return the winner id of a game 2', function () {
        for (var i = 0; i < games2.length; i++) {
            let game = games2[i];
            chai_1.expect(game.getWinnerId()).to.be.equal(testData.games2[i].winnerId);
        }
    });
    it('should return the winner id of a game 3', function () {
        for (var i = 0; i < games3.length; i++) {
            let game = games3[i];
            chai_1.expect(game.getWinnerId()).to.be.equal(testData.games3[i].winnerId);
        }
    });
    // order number
    it('should return the order number of a game 1', function () {
        for (var i = 0; i < games1.length; i++) {
            let game = games1[i];
            chai_1.expect(game.getOrderNumber()).to.be.equal(testData.games1[i].orderNum);
        }
    });
    it('should return the order number of a game 2', function () {
        for (var i = 0; i < games2.length; i++) {
            let game = games2[i];
            chai_1.expect(game.getOrderNumber()).to.be.equal(testData.games2[i].orderNum);
        }
    });
    it('should return the order number of a game 3', function () {
        for (var i = 0; i < games3.length; i++) {
            let game = games3[i];
            chai_1.expect(game.getOrderNumber()).to.be.equal(testData.games3[i].orderNum);
        }
    });
    // selections
    it('should return the correct array of selections 1', function () {
        for (var i = 0; i < games1.length; i++) {
            let game = games1[i];
            chai_1.expect(game.getSelections()).to.have.deep.members(Game_1.Selections.parseArray(testData.games1[i].selections));
        }
    });
    it('should return the correct array of selections 3', function () {
        for (var i = 0; i < games2.length; i++) {
            let game = games2[i];
            chai_1.expect(game.getSelections()).to.have.deep.members(Game_1.Selections.parseArray(testData.games2[i].selections));
        }
    });
    it('should return the correct array of selections 2', function () {
        for (var i = 0; i < games3.length; i++) {
            let game = games3[i];
            chai_1.expect(game.getSelections()).to.have.deep.members(Game_1.Selections.parseArray(testData.games3[i].selections));
        }
    });
    // selection by entrant id
    it('should return the correct selections for a given entrant id 1', function () {
        chai_1.expect(games1[0].getSelectionsForEntrantId(games1[0].getWinnerId())).to.deep.equal(selections1);
    });
    it('should return the correct selections for a given entrant id 1', function () {
        chai_1.expect(games1[0].getSelectionsForEntrantId(games1[1].getWinnerId())).to.deep.equal(selections2);
    });
    it('should return the correct selections for a given entrant id 1', function () {
        chai_1.expect(games1[0].getSelectionsForEntrantId(games1[2].getWinnerId())).to.deep.equal(selections3);
    });
    // selection type
    it('should return the correct selection type for a selection 1', function () {
        chai_1.expect(selections1.getSelectionType()).to.be.equal(testData.selectionsS1G1P2.selectionType);
    });
    it('should return the correct selection type for a selection 2', function () {
        chai_1.expect(selections2.getSelectionType()).to.be.equal(testData.selectionsS1G2P2.selectionType);
    });
    it('should return the correct selection type for a selection 3', function () {
        chai_1.expect(selections3.getSelectionType()).to.be.equal(testData.selectionsS1G3P2.selectionType);
    });
    // selection value
    it('should return the correct selection value for a selection 1', function () {
        chai_1.expect(selections1.getSelectionValue()).to.be.equal(testData.selectionsS1G1P2.selectionValue);
    });
    it('should return the correct selection value for a selection 2', function () {
        chai_1.expect(selections2.getSelectionValue()).to.be.equal(testData.selectionsS1G2P2.selectionValue);
    });
    it('should return the correct selection value for a selection 3', function () {
        chai_1.expect(selections3.getSelectionValue()).to.be.equal(testData.selectionsS1G3P2.selectionValue);
    });
    // entrant id
    it('should return the correct entrantId for a selection 1', function () {
        chai_1.expect(selections1.getEntrantId()).to.be.equal(testData.selectionsS1G1P2.entrantId);
    });
    it('should return the correct entrantId for a selection 2', function () {
        chai_1.expect(selections2.getEntrantId()).to.be.equal(testData.selectionsS1G2P2.entrantId);
    });
    it('should return the correct entrantId for a selection 3', function () {
        chai_1.expect(selections3.getEntrantId()).to.be.equal(testData.selectionsS1G3P2.entrantId);
    });
    // participant id
    it('should return the correct attendeeId for a selection 1', function () {
        chai_1.expect(selections1.getAttendeeId()).to.be.equal(testData.selectionsS1G1P2.participantId);
    });
    it('should return the correct attendeeId for a selection 2', function () {
        chai_1.expect(selections2.getAttendeeId()).to.be.equal(testData.selectionsS1G2P2.participantId);
    });
    it('should return the correct attendeeId for a selection 3', function () {
        chai_1.expect(selections3.getAttendeeId()).to.be.equal(testData.selectionsS1G3P2.participantId);
    });
});
