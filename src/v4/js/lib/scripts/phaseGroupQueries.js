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
exports.phaseGroup = `query PhaseGroupQuery($id: ID!){
	phaseGroup(id: $id){
		${Schema.phaseGroup}
	}
}`;
exports.phaseGroupSeeds = `query PhaseGroupSeedsQuery($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: SeedPageFilter){
	phaseGroup(id: $id){
		paginatedSeeds(query: {
			page: $page, 
			perPage: $perPage, 
			sortBy: $sortBy,
			filter: $filter
		}){
			{pageInfo}
			nodes{
				${Schema.seeds}
			}
		}
	}
}`;
exports.phaseGroupSeedStandings = `query PhaseGroupSeedsQuery($id: ID!, $page: Int, $perPage: Int, $orderBy: String, $filter: SeedPageFilter){
	phaseGroup(id: $id){
		paginatedSeeds(query: {			
			page: $page, 
			perPage: $perPage, 
			sortBy: $sortBy,
			filter: $filter
		}){
			{pageInfo}
			nodes{
				standings{
					${Schema.standing}
				}
			}
		}
	}
}`;
exports.phaseGroupSets = `query PhaseGroupEntrants($id: ID!, $page: Int, $perPage: Int, $sortType: SetSortType, $filters: SetFilters){
	phaseGroup(id: $id){
	  paginatedSets(page:$page, perPage:$perPage, sortType:$sortType, filters:$filters){
		{pageInfo}
		nodes{
			${Schema.set}
		}
	  }
	}
  }`;
exports.phaseGroupEntrants = `query PhaseGroupEntrants($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: SeedPageFilter){
	phaseGroup(id: $id){
		paginatedSeeds(query: {
			page: $page,
			perPage: $perPage,
			sortBy: $sortBy,
			filter: $filter
		}){
			{pageInfo}
			nodes{
				entrant{
					${Schema.entrant}
				}
			}
		}
	}	
}`;
exports.phaseGroupAttendees = `query PhaseGroupEntrants($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: SeedPageFilter){
	phaseGroup(id: $id){
		paginatedSeeds(query: {
			page: $page,
			perPage: $perPage,
			sortBy: $sortBy,
			filter: $filter
		}){
			{pageInfo}
			nodes{
				entrant{
					participants{
						${Schema.attendee}
					}
				}
			}
		}
	}	
}`;
