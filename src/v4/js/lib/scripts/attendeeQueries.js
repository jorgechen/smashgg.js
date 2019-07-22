"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema = __importStar(require("./schema"));
exports.getAttendeePhases = `query AttendeePhasesQuery($id: ID!){
    participant(id: $id){
        entrants {
            seeds {
                id
                phase {
                    ${schema.phase}
                }
            }
        }
    }
}`;
exports.getAttendeePhaseGroups = `query AttendeePhaseGroupsQuery($id: ID!){
    participant(id: $id){
        entrants {
            seeds {
                id
                phaseGroup {
                    ${schema.phaseGroup}
                }
            }
        }
    }
}`;
