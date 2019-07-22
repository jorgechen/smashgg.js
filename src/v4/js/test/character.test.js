/* eslint-disable */
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const { expect } = chai_1.default;
const Character_1 = require("../lib/Character");
const Cache_1 = __importDefault(require("../lib/util/Cache"));
const MELEE_CHAR_COUNT = 27;
const PM_CHAR_COUNT = 42;
const BOWSER_ID = 1;
const MELEE_ID = 1;
const WOLF_ID = 116;
const PM_ID = 2;
describe('Smashgg Character', function () {
    beforeEach(async function () {
        await Cache_1.default.getInstance().flushAll();
    });
    it('should get all characters', async function () {
        this.timeout(10000);
        let characters = await Character_1.Character.getAll();
        expect(characters.length > 0).to.be.true;
        characters.forEach(character => {
            expect(character).to.be.instanceof(Character_1.Character);
        });
        return true;
    });
    it('should get a character by id number', async function () {
        this.timeout(10000);
        let bowser = await Character_1.Character.getById(BOWSER_ID);
        let wolf = await Character_1.Character.getById(WOLF_ID);
        expect(bowser).to.be.instanceof(Character_1.Character);
        expect(wolf).to.be.instanceof(Character_1.Character);
        expect(bowser.getName()).to.be.equal('Bowser');
        expect(wolf.getName()).to.be.equal('Wolf');
        return true;
    });
    it('should get all characters for a game by game id', async function () {
        this.timeout(10000);
        let meleeCharacters = await Character_1.Character.getByGameId(MELEE_ID);
        let pmCharacters = await Character_1.Character.getByGameId(PM_ID);
        expect(meleeCharacters.length).to.be.equal(MELEE_CHAR_COUNT);
        expect(pmCharacters.length).to.be.equal(PM_CHAR_COUNT);
        meleeCharacters.forEach(character => {
            expect(character).to.be.instanceof(Character_1.Character);
        });
        pmCharacters.forEach(character => {
            expect(character).to.be.instanceof(Character_1.Character);
        });
        return true;
    });
    it('should get all characters for a game by game name', async function () {
        this.timeout(10000);
        let meleeCharacters = await Character_1.Character.getByGameName('melee');
        let pmCharacters = await Character_1.Character.getByGameName('pm');
        expect(meleeCharacters.length).to.be.equal(MELEE_CHAR_COUNT);
        expect(pmCharacters.length).to.be.equal(PM_CHAR_COUNT);
        meleeCharacters.forEach(character => {
            expect(character).to.be.instanceof(Character_1.Character);
        });
        pmCharacters.forEach(character => {
            expect(character).to.be.instanceof(Character_1.Character);
        });
        return true;
    });
    it('should get characters by their name', async function () {
        this.timeout(10000);
        let bowser = await Character_1.Character.getByName('bowser');
        let wolf = await Character_1.Character.getByName('wolf');
        expect(bowser.length).to.be.equal(6);
        expect(wolf.length).to.be.equal(2);
        bowser.forEach(character => {
            expect(character).to.be.instanceof(Character_1.Character);
        });
        wolf.forEach(character => {
            expect(character).to.be.instanceof(Character_1.Character);
        });
        expect(bowser[0].id).to.be.equal(BOWSER_ID);
        expect(bowser[0].videogameId).to.be.equal(MELEE_ID);
        expect(wolf[0].id).to.be.equal(WOLF_ID);
        expect(wolf[0].videogameId).to.be.equal(PM_ID);
        return true;
    });
    it('should get characters by their name and their game name', async function () {
        this.timeout(10000);
        let bowser = await Character_1.Character.getByNameAndGame('bowser', 'melee');
        let wolf = await Character_1.Character.getByNameAndGame('wolf', 'pm');
        expect(bowser).to.be.instanceof(Character_1.Character);
        expect(wolf).to.be.instanceof(Character_1.Character);
        expect(bowser.id).to.be.equal(BOWSER_ID);
        expect(bowser.videogameId).to.be.equal(MELEE_ID);
        expect(wolf.id).to.be.equal(WOLF_ID);
        expect(wolf.videogameId).to.be.equal(PM_ID);
        return true;
    });
    it('should get characters by their name and their game id', async function () {
        this.timeout(10000);
        let bowser = await Character_1.Character.getByNameAndGameId('bowser', MELEE_ID);
        let wolf = await Character_1.Character.getByNameAndGameId('wolf', PM_ID);
        expect(bowser).to.be.instanceof(Character_1.Character);
        expect(wolf).to.be.instanceof(Character_1.Character);
        expect(bowser.id).to.be.equal(BOWSER_ID);
        expect(bowser.videogameId).to.be.equal(MELEE_ID);
        expect(wolf.id).to.be.equal(WOLF_ID);
        expect(wolf.videogameId).to.be.equal(PM_ID);
        return true;
    });
});
