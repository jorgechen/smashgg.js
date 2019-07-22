'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const Logger_1 = __importDefault(require("./Logger"));
const moment_1 = __importDefault(require("moment"));
const events_1 = require("events");
const RETRY_RATE = 3;
const DELINQUENCY_RATE = 70; // 80 officially
const DELINQUENCY_TIMER = 60000; // 1 min
const UPDATE_INTERVAL = 250;
class QueueItem {
    constructor(item, timestamp) {
        this.item = item;
        this.timestamp = timestamp;
        this.isExecuted = false;
    }
    execute() {
        this.item();
        this.isExecuted = true;
    }
}
class QueryQueue extends events_1.EventEmitter {
    constructor() {
        super();
        this.queue = [];
        this.availableSlots = DELINQUENCY_RATE;
        this.queue = [];
        this.availableSlots = DELINQUENCY_RATE;
    }
    static init() {
        if (!QueryQueue.initialized) {
            QueryQueue.instance = new QueryQueue();
            QueryQueue.processing = false;
            QueryQueue.instance.on('add', async function () {
                if (!QueryQueue.processing)
                    QueryQueue.instance.processQueue();
                return true;
            });
            QueryQueue.instance.on('empty', async function () {
                QueryQueue.processing = false;
                clearInterval(QueryQueue.processInterval);
            });
            QueryQueue.instance.processQueue();
            QueryQueue.notificationInterval;
            QueryQueue.processInterval;
            QueryQueue.initialized = true;
        }
    }
    /**
     * getInstance
     *
     * returns the singleton instance of QueryQueue
     */
    static getInstance() {
        if (!QueryQueue.initialized)
            throw new Error('QueryQueue not initialized!');
        return QueryQueue.instance;
    }
    getQueue() {
        return this.queue.slice(0, DELINQUENCY_RATE);
    }
    getDelinquencyQueue() {
        return this.queue.slice(0, DELINQUENCY_RATE);
    }
    processQueue() {
        let _this = this;
        QueryQueue.processing = true;
        // mange removing elements from the queue
        QueryQueue.processInterval = setInterval(() => {
            if (_this.queue.length > 0) {
                let beginMoment = moment_1.default(_this.queue[0].timestamp);
                let minuteAfter = moment_1.default(_this.queue[0].timestamp).add(1, 'minute');
                let shouldBePopped = moment_1.default().isSameOrAfter(minuteAfter);
                // pop element if needed and then set the DELINQUENCY_RATE'th element
                // timestamp to right now
                if (shouldBePopped) {
                    _this.pop();
                    Logger_1.default.info("Slot opened. Queue size: %s", _this.queue.length);
                    if (_this.queue.length >= DELINQUENCY_RATE)
                        _this.queue[DELINQUENCY_RATE - 1].timestamp = moment_1.default().toDate();
                }
            }
            // notify users of when the next query will fire if client is delinquent
            if (_this.queue.length >= DELINQUENCY_RATE && !QueryQueue.notificationInterval) {
                QueryQueue.notificationInterval = setInterval(() => {
                    let minuteAfter = moment_1.default(_this.queue[0].timestamp).add(1, 'minute');
                    let timeToNext = moment_1.default.duration(minuteAfter.diff(moment_1.default()));
                    Logger_1.default.debug('element 0 timestamp: %s', moment_1.default(_this.queue[0].timestamp).format());
                    Logger_1.default.debug('minuteAfter: %s', minuteAfter.format());
                    Logger_1.default.info('next query firing in %s seconds', timeToNext.seconds());
                }, 5000);
            }
            else if (_this.queue.length < DELINQUENCY_RATE && QueryQueue.notificationInterval) {
                clearInterval(QueryQueue.notificationInterval);
                QueryQueue.notificationInterval = null;
            }
            // handle function executions
            // functions at or near the delinquency limit should be fired first
            if (_this.queue.length > 0) {
                let limit = _this.queue.length >= DELINQUENCY_RATE ? DELINQUENCY_RATE : _this.queue.length;
                for (let i = limit; i > 0; i--) {
                    if (!_this.queue[i - 1].isExecuted)
                        _this.queue[i - 1].execute();
                }
            }
            // fire event if the queue is empty
            if (_this.queue.length == 0)
                _this.emitEmptyEvent();
        }, UPDATE_INTERVAL);
    }
    add(element) {
        if (element.constructor.name != 'Function')
            throw new Error('SRQ Error: Elements added must be a function wrapping around a promise');
        let item;
        if (this.queue.length < DELINQUENCY_RATE) {
            Logger_1.default.verbose('Queue Size: %s. Adding to queue', this.queue.length);
            item = new QueueItem(element, moment_1.default().toDate());
        }
        else {
            this.emitFullEvent();
            Logger_1.default.warn('Queue Size: %s. Queueing in delinquency', this.queue.length);
            item = new QueueItem(element, null);
        }
        this.queue.push(item);
    }
    pop() {
        if (this.queue.length > 0)
            return this.queue.shift();
        else
            return null;
    }
    getLength() {
        return this.queue.length;
    }
    emitAddEvent(element) {
        this.emit('add', element);
    }
    emitEmptyEvent() {
        this.emit('empty');
    }
    emitFullEvent() {
        this.emit('full');
    }
}
QueryQueue.initialized = false;
QueryQueue.processing = false;
exports.default = QueryQueue;
module.exports = QueryQueue;
