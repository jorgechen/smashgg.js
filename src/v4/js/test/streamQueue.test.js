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
const chai_1 = __importDefault(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
chai_1.default.use(chai_as_promised_1.default);
const { expect } = chai_1.default;
const Initializer_1 = __importDefault(require("../lib/util/Initializer"));
const StreamQueue_1 = require("../lib/StreamQueue");
const Stream_1 = require("../lib/Stream");
const GGSet_1 = require("../lib/GGSet");
const testData = __importStar(require("./data/streamQueue.testData"));
let streamQueue1;
const STREAM_QUEUE_TOURNAMENT_ID_1 = 6620;
describe('smashgg Stream Queue', function () {
    before(async function () {
        await Initializer_1.default(process.env.API_TOKEN);
        streamQueue1 = await StreamQueue_1.StreamQueue.get(STREAM_QUEUE_TOURNAMENT_ID_1);
        expect(streamQueue1).to.not.be.null;
        return true;
    });
    it('should get the correct Stream 1', function () {
        expect(streamQueue1[0].getStream()).to.deep.equal(Stream_1.Stream.parse(testData.streamQueue1[0].stream));
    });
    it('should get the correct Sets 1', function () {
        expect(streamQueue1[0].getSets()).to.have.deep.members(testData.streamQueue1[0].sets.map(set => GGSet_1.GGSet.parse(set)));
    });
});
