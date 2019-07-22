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
exports.phase = `
query PhaseQuery($id: ID!){
	phase(id: $id){
		${Schema.phase}
	}
}
`;
exports.phaseSeeds = `
query PhaseSeedQuery($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: SeedPageFilter){
	phase(id: $id){
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
exports.phasePhaseGroups = `
query PhaseGroupsQuery($eventId: Int){
	event(id: $eventId){
		phaseGroups{
			${Schema.phaseGroup}
		}
	}
}`;
exports.phaseSets = `
query PhaseSets($eventId:Int, $page: Int, $perPage: Int, $sortType: SetSortType, $filters: SetFilters, $hasPermissions: Boolean){
	event(id: $eventId){
	  phaseGroups{
			paginatedSets(
				page: $page,
				perPage: $perPage,
				sortType: $sortType,
				hasPermissions: $hasPermissions,
				filters: $filters
			){
				{pageInfo}
				nodes{
					${Schema.set}
				}
			}
	  }
	}
}`;
exports.phaseEntrants = `
query PhaseEntrants($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: SeedPageFilter){
	phase(id: $id){
		paginatedSeeds(query: {
		  page: $page,
		  perPage: $perPage,
		  sortBy: $sortBy,
		  filter: $filter
		}){
		  {pageInfo},
		  nodes{
			  entrant{
				  ${Schema.entrant}
			  }
		  }
		}
	}	
}`;
exports.phaseAttendees = `
query PhaseAttendees($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: SeedPageFilter){
	phase(id: $id){
		paginatedSeeds(query:{
		  page: $page,
		  perPage: $perPage,
		  sortBy: $sortBy,
		  filter: $filter
		}){
		  {pageInfo},
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
