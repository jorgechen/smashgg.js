"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const Encoder_1 = __importDefault(require("./Encoder"));
const lodash_1 = __importDefault(require("lodash"));
const Logger_1 = __importDefault(require("./Logger"));
const DEFAULT_CONCURRENCY = 4;
const TOP_8_LABELS = [
    'Losers Quarter-Final', 'Losers Semi-Final',
    'Winners Semi-Final', 'Winners Final',
    'Grand Final', 'Grand Final Reset', 'Losers Final'
];
const TOP_8_LABELS_STANDALONE = [
    'Losers Quarter-Final', 'Losers Semi-Final',
    'Winners Semi-Final', 'Winners Final',
    'Grand Final', 'Grand Final Reset', 'Losers Final',
    'Losers Round 1'
];
const losersRoundRegex = new RegExp(/Losers Round ([0-9])/);
function merge(target, obj) {
    let ret = lodash_1.default.clone(target);
    for (let prop in obj) {
        let regex = new RegExp(`{${prop}}`, 'g');
        ret = ret.replace(regex, obj[prop]);
    }
    return ret;
}
exports.merge = merge;
function mergeQuery(target, obj) {
    let ret = lodash_1.default.clone(target);
    for (let prop in obj) {
        let regex = new RegExp(`{${prop}}`, 'g');
        ret = ret.replace(regex, obj[prop]);
    }
    let orphanedVarsRegex = new RegExp(/\{[\S]*\}/, 'g');
    let orphanedVars = orphanedVarsRegex.exec(ret);
    if (orphanedVars) {
        Logger_1.default.warn('Variables orphaned by this query: [%s]', orphanedVars.join(','));
        Logger_1.default.warn('Replacing orphans with null');
        ret = ret.replace(orphanedVarsRegex, 'null');
    }
    Logger_1.default.queries(ret);
    return ret;
}
exports.mergeQuery = mergeQuery;
function determineComplexity(...objects) {
    let complexity = 0;
    let objs = [];
    for (let i in objects) {
        let obj = objects[i];
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                complexity++;
                objs.push(obj[key]);
            }
        }
    }
    if (complexity == 0)
        return 0;
    else
        return complexity + determineComplexity(objs);
}
exports.determineComplexity = determineComplexity;
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
function orderTop8(sets) {
    let ordered = [];
    const fn = (roundName) => {
        ordered = ordered.concat(lodash_1.default.find(sets, set => {
            return set.getFullRoundText() == roundName;
        }));
    };
    let hasReset = lodash_1.default.find(sets, set => {
        return set.getFullRoundText() === 'Grand Final Reset';
    });
    if (hasReset)
        fn('Grand Final Reset');
    fn('Grand Final');
    fn('Losers Final');
    fn('Losers Semi-Final');
    fn('Winners Final');
    fn('Losers Quarter-Final');
    fn('Winners Semi-Final');
    let roundNames = sets.map(set => set.getFullRoundText());
    let losersRoundName = roundNames.filter(name => losersRoundRegex.test(name))[0];
    fn(losersRoundName);
    return ordered;
}
exports.orderTop8 = orderTop8;
function parseOptions(options) {
    return {
        isCached: options.isCached != undefined ? options.isCached === true : true,
        concurrency: options.concurrency || DEFAULT_CONCURRENCY,
        rawEncoding: Encoder_1.default.determineEncoding(options.rawEncoding)
    };
}
exports.parseOptions = parseOptions;
// todo remove theabove and below non-null expectations
function getHighestLevelLosersRound(sets) {
    let loserRounds = sets.filter(set => losersRoundRegex.test(set.getFullRoundText()));
    let loserRoundNumbers = loserRounds.map(set => losersRoundRegex.exec(set.getFullRoundText())[1]);
    let highestLoserRoundNumber = Math.max.apply(null, loserRoundNumbers);
    return `Losers Round ${highestLoserRoundNumber}`;
}
exports.getHighestLevelLosersRound = getHighestLevelLosersRound;
function filterForTop8Sets(sets) {
    let highestLoserRound = getHighestLevelLosersRound(sets);
    let targetLabels = TOP_8_LABELS.concat([highestLoserRound]);
    let topSets = sets.filter(set => targetLabels.includes(set.getFullRoundText()));
    return orderTop8(topSets);
}
exports.filterForTop8Sets = filterForTop8Sets;
function createExpandsString(expands) {
    let expandsString = '';
    for (let property in expands) {
        if (expands.hasOwnProperty(property))
            expandsString += util_1.format('expand[]=%s&', property);
    }
    return expandsString;
}
exports.createExpandsString = createExpandsString;
function convertEpochToDate(epoch) {
    let d = new Date(0);
    d.setUTCSeconds(epoch);
    return d;
}
exports.convertEpochToDate = convertEpochToDate;
var ICommon;
(function (ICommon) {
    function parseOptions(options) {
        return {
            isCached: options.isCached != undefined ? options.isCached === true : true,
            concurrency: options.concurrency || 4,
            rawEncoding: Encoder_1.default.determineEncoding(options.rawEncoding)
        };
    }
    ICommon.parseOptions = parseOptions;
})(ICommon = exports.ICommon || (exports.ICommon = {}));
