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
exports.user = `query UserQuery($id: ID!) {
	player(id:$id){
		${Schema.user}
	}
}`;
exports.userRankings = `query UserRankings($id: ID!) {
	player(id:$id){
		id
		rankings{
			id
			title
			rank
		}
	}
}`;
exports.userRecentGGSets = `query UserRecentSets($id: ID!) {
	player(id:$id){
		id
		recentSets{
      		${Schema.set}     
		}
	}
}`;
