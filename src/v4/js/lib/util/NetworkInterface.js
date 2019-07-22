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
const Logger_1 = __importDefault(require("./Logger"));
const Common = __importStar(require("./Common"));
const StaggeredRequestQueue_1 = __importDefault(require("./StaggeredRequestQueue"));
const GQLClient_1 = __importDefault(require("./GQLClient"));
const QueryQueue_1 = __importDefault(require("./QueryQueue"));
const Common_1 = require("./Common");
//import {ITournament, IEvent, IPhase, IPhaseGroup, IPlayer, IGGSet} from '../internal'
const RATE_LIMIT_MS_TIME = process.env.RateLimitMsTime || 1000;
const TOTAL_PAGES_REGEX_JSON = new RegExp(/"pageInfo":[\s]?{[\n\s]*?"totalPages": ([0-9]*)/);
const TOTAL_PAGES_REGEX_STRING = new RegExp(/"pageInfo":{"totalPages":([0-9]*),"perPage":([0-9]*)}/);
const MAX_COMPLEXITY = 1000;
class NetworkInterface {
    static init() {
        if (!NetworkInterface.initialized) {
            NetworkInterface.client = GQLClient_1.default.getInstance();
            NetworkInterface.initialized = true;
        }
    }
    /**
     * query
     *
     * takes a graphql query string and corresponding variable object
     * if the client has not exceeded the threshold of 80 requests per 60
     * seconds, it is considered Not Delinquent.
     * otherwise, a Delinquent client will be halted from executing their
     * queries. In this case, the query is wrapped in a function returning
     * a promise to be fired after the 60 second time limit is up
     *
     * Useful for when many queries need to be run consecutively
     *
     * @param  {string} query
     * @param  {object} variables
     * @returns {promise} resolving the results of the query after being staggered in the request queue
     */
    static query(query, variables) {
        return new Promise(function (resolve, reject) {
            Logger_1.default.queries("Query: " + JSON.stringify(query) + ":\n" + JSON.stringify(variables));
            QueryQueue_1.default.getInstance().add(() => {
                return NetworkInterface.client.request(query, variables)
                    .then(resolve)
                    .catch(reject);
            });
        });
    }
    static rawQuery(query, variables) {
        return new Promise(function (resolve, reject) {
            Logger_1.default.queries("Raw Query: " + JSON.stringify(query) + ":\n" + JSON.stringify(variables));
            QueryQueue_1.default.getInstance().add(() => {
                return NetworkInterface.client.rawRequest(query, variables)
                    .then(resolve)
                    .catch(reject);
            });
        });
    }
    static staggeredQuery(query, variables) {
        return new Promise(function (resolve, reject) {
            StaggeredRequestQueue_1.default.getInstance().add(() => {
                return NetworkInterface.client.request(query, variables)
                    .then(resolve)
                    .catch(reject);
            });
        });
    }
    static clusterQuery(keys, fcn, options) {
        return Promise.all(keys.map(key => {
            if (!key.hasOwnProperty(fcn) && !key.__proto__.hasOwnProperty(fcn))
                throw new Error(`${fcn} is not a function in type ${typeof key}`);
            return key[fcn](options);
        }));
    }
    static async singleQuery(query, variables) {
        await Common.sleep(+RATE_LIMIT_MS_TIME);
        return await NetworkInterface.client.request(query, variables);
    }
    static async paginatedQuery(operationName, queryString, params, options, additionalParams, complexitySubtraction = 0) {
        Logger_1.default.info('%s: Calling Paginated Querys', operationName);
        Logger_1.default.queries("Paginated Query: " + JSON.stringify(queryString) + ":\n" + JSON.stringify(params));
        let results = [];
        // parse options
        let page = options != undefined && options.page ? options.page : 1;
        let perPage = options != undefined && options.perPage ? options.perPage : null;
        let filters = options != undefined && options.filters ? options.filters : null;
        // preflight query
        // first paginated query should get the total page count w/ data
        // also initial query will be used to determine optimal stats
        let queryOptions = {
            page: page,
            perPage: perPage,
            filters: filters,
            pageInfo: 'pageInfo{\ntotalPages\nperPage\n}'
        };
        queryOptions = Object.assign(queryOptions, additionalParams);
        let preflightQuery = Common_1.mergeQuery(queryString, queryOptions);
        let preflightData = [await NetworkInterface.rawQuery(preflightQuery, params)];
        if (preflightData.length <= 0)
            throw new Error(`${operationName}: No data returned from query for operation`);
        let totalPages;
        [totalPages, perPage] = NetworkInterface.parseTotalPages(operationName, preflightData);
        let onePageComplexity = preflightData[0].extensions.queryComplexity - complexitySubtraction;
        Logger_1.default.info('%s total pages, %s perPage, Object Complexity per Page: %s', totalPages, perPage, onePageComplexity);
        // get total page count and verify we are getting things back from the api
        //let complexity = NetworkInterface.determineComplexity(data[0]) - complexitySubtraction //Object.keys(data[0]).length
        //log.info('Total Pages using 1 perPage: %s, Object Complexity per Page: %s', totalPages, complexity)
        // check to see if the implementer is forcing perPage
        // if they are not, calculate the optimal perPage count,
        // requery for new pageCount, and continue
        let query, data;
        /*
        let isForcingPerPage = perPage > 1 && options != undefined && options.perPage != undefined // TODO this logic is probably superficial
        if(!isForcingPerPage){
            log.info('Optimal Per Page Count: %s', perPage)
            queryOptions = {
                page: page,
                perPage: perPage,
                filters: filters,
                pageInfo: 'pageInfo{\ntotalPages\n}'
            }
            //queryOptions = Object.assign(queryOptions, additionalParams)
            query = mergeQuery(queryString, queryOptions)
            let optimizedData = await NetworkInterface.query(query, params)
            data = data.concat([optimizedData])
            totalPages = NetworkInterface.parseTotalPages(operationName, optimizedData)
            log.info('Optimal Page Count: %s', totalPages)
        }
        else
            log.warn('Implementer has chosen to force perPage at %s per page', perPage)
        */
        // after, leave off the total page count to minimize complexity
        for (let i = 1; i <= totalPages; i++) {
            Logger_1.default.info('%s: Collected %s/%s pages', operationName, i, totalPages);
            queryOptions = Object.assign({
                page: i,
                perPage: perPage,
                filters: filters,
                pageInfo: ''
            }, additionalParams);
            query = Common_1.mergeQuery(queryString, queryOptions);
            const queryParams = Object.assign(params, {
                page: i,
                perPage,
                filters,
            });
            results.push(await NetworkInterface.query(query, queryParams));
        }
        return results;
    }
    static parseTotalPages(operationName, results) {
        let parsed = TOTAL_PAGES_REGEX_STRING.exec(JSON.stringify(results));
        if (!parsed)
            throw new Error(`${operationName}: Something wrong with paginated query. Did not match regex ${TOTAL_PAGES_REGEX_STRING.toString()}`);
        return [+parsed[1], +parsed[2]];
    }
    static calculateOptimalPerPagecount(objectComplexity, totalPages) {
        let totalComplexity = objectComplexity * totalPages;
        return MAX_COMPLEXITY / objectComplexity;
        /*
        log.verbose('Calculating Optimal Pagecount: Complexity [%s], Total Pages [%s], Total Complexity [%s]',
            objectComplexity, totalPages, totalComplexity
        )

        if(totalComplexity < MAX_COMPLEXITY)
            return 1
            //return Math.ceil(MAX_COMPLEXITY / objectComplexity / totalPages)
        else
            return Math.ceil(MAX_COMPLEXITY / objectComplexity / totalPages)
            //return Math.floor((objectComplexity * totalPages) / MAX_COMPLEXITY)
        */
    }
    static determineComplexity(objects) {
        let complexity = 0;
        let nextArgs = [];
        for (let i in objects) {
            // add 1 for each object passed into the function arg array
            complexity++;
            let cur = objects[i];
            for (let key in cur) {
                if (key === 'pageInfo')
                    continue;
                else if (typeof cur[key] === 'object' && cur[key] != null) {
                    // if array, calculate the first object then multiple by how many perPage
                    // otherwise add object to nextArgs and dig
                    if (Array.isArray(cur[key])) {
                        complexity *= cur[key].length;
                        nextArgs.push(cur[key][0]);
                    }
                    else {
                        nextArgs.push(cur[key]);
                    }
                }
            }
        }
        if (nextArgs.length === 0)
            return complexity;
        else
            return complexity + NetworkInterface.determineComplexity(nextArgs);
    }
}
NetworkInterface.initialized = false;
NetworkInterface.isClientDelinquent = false;
NetworkInterface.queryCount = 0;
exports.default = NetworkInterface;
module.exports = NetworkInterface;
