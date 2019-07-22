"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema = __importStar(require("./schema"));
exports.set = `query SetQuery($id: String!){
	set(id:$id){
		${Schema.set}
	}
}`;
exports.games = `query SetQuery($id: String!){
	set(id:$id){
		games{
			${Schema.game}
		}
	}
}`;
exports.entrants = `query SetEntrants($id: String!){
	set(id: $id){
		slots{
			entrant{
				${Schema.entrant}
			}
		}
	}
}`;
exports.attendees = `query SetParticipants($id: String!){
	set(id: $id){
		slots{
			entrant{
				participants{
					${Schema.attendee}
				}
			}
		}
	}
}`;
