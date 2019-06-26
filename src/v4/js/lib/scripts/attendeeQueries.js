"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var schema = __importStar(require("./schema"));
exports.getAttendeePhases = "query AttendeePhasesQuery($id: ID!){\n    participant(id: $id){\n        entrants {\n            seeds {\n                id\n                phase {\n                    " + schema.phase + "\n                }\n            }\n        }\n    }\n}";
exports.getAttendeePhaseGroups = "query AttendeePhaseGroupsQuery($id: ID!){\n    participant(id: $id){\n        entrants {\n            seeds {\n                id\n                phaseGroup {\n                    " + schema.phaseGroup + "\n                }\n            }\n        }\n    }\n}";
