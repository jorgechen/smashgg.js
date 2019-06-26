import * as Schema from './schema'

export const league = `query LeagueQuery($id: ID!){
  league(id: $id){
    ${Schema.league}
  }
}`

export const leagueBySlug = `query LeagueQuery($slug: String) {
  league(slug: $slug){
    ${Schema.league}
  }
}`

export const leagueEntrants = `query LeagueEntrants($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: EventEntrantPageQueryFilter){
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
}`

export const leagueEvents = `query LeagueEvents($id: ID!){
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
}`

export const leaguePhases = `query LeaguePhases($id: ID!){
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
}`

export const leaguePhaseGroups = `query LeaguePhaseGroups($id: ID!){
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
}`

/** WARNING THIS DOES NOT WORK CURRENTLY DUE TO RECURSIVE LIMITATIONS, Use leaguePhaseGroupIds instead **/
export const leagueSets = `query LeagueSets($id: ID!){
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
}`

export const leaguePhaseGroupIds = `query PhaseGroupIdQuery($id: ID!){
  league(id: $id){
    events{
      id
      phaseGroups{
        id
      }
    }
  }
}`
