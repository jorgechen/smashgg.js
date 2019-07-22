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
exports.league = `query LeagueQuery($id: ID!){
  league(id: $id){
    ${Schema.league}
  }
}`;
exports.leagueBySlug = `query LeagueQuery($slug: String) {
  league(slug: $slug){
    ${Schema.league}
  }
}`;
exports.leagueEntrants = `query LeagueEntrants($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: EventEntrantPageQueryFilter){
  league(id: $id){
    events{
      entrants(query: {
        page: $page,
        perPage: $perPage,
        sortBy: $sortBy,
        filter: $filter
      }){
        {pageInfo}
        nodes{
          ${Schema.entrant}
        }
      }
    }
  }
}`;
exports.leagueEvents = `query LeagueEvents($id: ID!){
  league(id: $id){
    events{
    	nodes {
      	${Schema.event}
      }
      pageInfo {
      	${Schema.PageInfo}
      }
    }
  }
}`;
exports.leaguePhases = `query LeaguePhases($id: ID!){
  league(id: $id){
    events{
    	nodes{
				id
				phases{
					${Schema.phase}
				}
			}
			pageInfo{
				${Schema.PageInfo}
			}
    }
  }   
}`;
exports.leaguePhaseGroups = `query LeaguePhaseGroups($id: ID!){
  league(id: $id){
    events{
    	nodes{
				phaseGroups{
					${Schema.phaseGroup}
      	}
      }
			pageInfo{
				${Schema.PageInfo}
			}
    }
  }   
}`;
/** WARNING THIS DOES NOT WORK CURRENTLY DUE TO RECURSIVE LIMITATIONS, Use leaguePhaseGroupIds instead **/
exports.leagueSets = `query LeagueSets($id: ID!){
  league(id: $id){
    events{
			nodes {
				phaseGroups{
					sets{
						${Schema.set}
					}
				}
      }
			pageInfo{
				${Schema.PageInfo}
			}
    }
  }   
}`;
exports.leaguePhaseGroupIds = `query PhaseGroupIdQuery($id: ID!){
  league(id: $id){
    events{
      id
      phaseGroups{
        id
      }
    }
  }
}`;
exports.leagueStandings = `query LeagueStandings($id: ID!, $page: Int, $perPage: Int){
    league(id: $id){
        standings(query: {
            page: $page,
            perPage: $perPage,
        }){
            nodes{
                ${Schema.standing}
            }
            {pageInfo}
        }
    }
}
`;
