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
exports.tournament = `query TournamentQuery($id: ID!){
    tournament(id: $id){
        ${Schema.tournament}
    }
}`;
exports.tournamentBySlug = `query TournamentQuery($slug: String) {
    tournament(slug: $slug){
        ${Schema.tournament}
    }
}`;
exports.tournamentOrganizer = `query tournamentOrganizer($id: ID!){
    tournament(id: $id){
        ${Schema.organizer}
    }   
}`;
exports.tournamentVenue = `query tournamentVenue($id: ID!){
    tournament(id: $id){
		${Schema.venue}
	}	
}`;
exports.tournamentEntrants = `query TournamentEntrants($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: EventEntrantPageQueryFilter){
    tournament(id: $id){
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
exports.tournamentAttendees = `query TournamentAttendees($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: ParticipantPageFilter){
    tournament(id: $id){
        participants(query: {
            page: $page,
            perPage: $perPage,
            sortBy: $sortBy,
            filter: $filter
        },
        isAdmin: false){
            {pageInfo}
            nodes{
                ${Schema.attendee}
            }
        }
    }  
}`;
exports.tournamentAttendeeSearch = `query SearchTournamentAttendeesQuery($id:ID!, $smashtag:String){
    tournament(id:$id){
      participants(query:{
        page: 1,
        perPage: 50,
        sortBy: "asc",
        filter:{
          search:{
            fieldsToSearch:["gamerTag"],
            searchString: $smashtag
          }
        }
      }, isAdmin:false){
        nodes{
          ${Schema.attendee}
        }
      }
    }
  }`;
exports.tournamentAttendeeSearchByPrefix = `query SearchTournamentAttendeesBySponsorQuery($id:ID!, $sponsor:String){
    tournament(id:$id){
      participants(query:{
        page: 1,
        perPage: 50,
        sortBy: "asc",
        filter:{
          search:{
            fieldsToSearch:["prefix"],
            searchString: $sponsor
          }
        }
      }, isAdmin:false){
        nodes{
          ${Schema.attendee}
        }
      }
    }
  }`;
exports.tournamentEvents = `query TournamentEvents($id: ID!){
    tournament(id: $id){
        events:{
            ${Schema.event}
        }
    }
}`;
exports.tournaments = `query Tournaments($page: Int, $perPage: Int, $sortBy: String, $filter: TournamentPageFilter){
  tournaments(query: {
    page: $page,
    perPage: $perPage,
    sortBy: $sortBy,
    filter: $filter
  }){
    {pageInfo}
    nodes{
      id
      name
      slug
      startAt
      endAt
      events {
        id
        name
        slug
        videogameId
      }
    }
  }
}`;
exports.tournamentPhases = `query TournamentPhases($id: ID!){
    tournament(id: $id){
        events{
            id
            phases{
                ${Schema.phase}
            }
        }
    }   
}`;
exports.tournamentPhaseGroups = `query TournamentPhaseGroups($id: ID!){
    tournament(id: $id){
        events{
            phaseGroups{
                ${Schema.phaseGroup}
            }
        }
    }   
}`;
/** WARNING THIS DOES NOT WORK CURRENTLY DUE TO RECURSIVE LIMITATIONS, Use tournamentPhaseGroupIds instead **/
exports.tournamentSets = `query TournamentSets($id: ID!){
    tournament(id: $id){
        events{
            phaseGroups{
                sets{
                    ${Schema.set}
                }
            }
        }
    }   
}`;
exports.tournamentPhaseGroupIds = `query PhaseGroupIdQuery($id: ID!){
    tournament(id: $id){
        events{
            id
            phaseGroups{
                id
            }
        }
    }
}`;
