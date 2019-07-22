'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const LEGAL_ENCODINGS = ['json', 'utf8', 'base64'];
const DEFAULT_ENCODING = process.env.DefaultEncoding || 'json';
class Encoder {
    static determineEncoding(encoding) {
        return encoding != undefined && LEGAL_ENCODINGS.includes(encoding) ? encoding : DEFAULT_ENCODING;
    }
    static encode(data, encoding = DEFAULT_ENCODING) {
        let encoded = encoding == 'json' ? data : new Buffer(JSON.stringify(data)).toString(encoding);
        return encoded;
    }
    static decode(data, encoding = DEFAULT_ENCODING) {
        let decoded = encoding == 'json' ? data : JSON.parse(new Buffer(data.toString(), encoding).toString('utf8'));
        return decoded;
    }
}
exports.default = Encoder;
