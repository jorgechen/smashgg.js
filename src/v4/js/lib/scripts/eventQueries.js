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
exports.event = `query EventQuery($id: ID!){
    event(id:$id){   
        ${Schema.event}
    }
}`;
exports.eventSlug = `query EventQuery($slug:String){
    event(slug:$slug){
        ${Schema.event}
  	}
}`;
exports.eventPhases = `query EventPhases($id: ID!){
    event(id: $id){
        phases{
            ${Schema.phase}
        }   
    }
}`;
exports.eventPhaseGroups = `query EventPhaseGroups($id: ID!){
    event(id: $id){
        phaseGroups{
            ${Schema.phaseGroup}
        }
    }   
}`;
exports.eventStandings = `query EventStandings($id: ID!, $page: Int, $perPage: Int){
    event(id: $id){
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
exports.eventTournament = `query EventTournament($id: ID!){
    event(id: $id){
        tournament {
            ${Schema.tournament}
        }
    }
}
`;
exports.eventSets = `query EventSets($id: ID!, $page: Int, $perPage: Int, $sortType: SetSortType, $filters: SetFilters){
    event(id: $id){
          sets(
              page: $page,
              perPage: $perPage,
              sortType: $sortType,
              filters: $filters
          ){
              {pageInfo}
              nodes{
                  ${Schema.set}
              }
        }
    }   
}`;
exports.eventSetsRaw = `query EventSets($id: ID!, $page: Int, $perPage: Int, $sortType: SetSortType, $filters: SetFilters){
    event(id: $id){
          sets(
              page: $page,
              perPage: $perPage,
              sortType: $sortType,
              filters: $filters
          ){
              {pageInfo}
              nodes{
                  ${Schema.set}
                  games {
                    ${Schema.game}
                  }
              }
        }
    }   
}`;
exports.eventEntrants = `query EventEntrants($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: EventEntrantPageQueryFilter){
    event(id: $id){
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
}`;
exports.eventAttendees = `query EventAttendees($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $isAdmin: Boolean, $filter: ParticipantPageFilter){
    event(id: $id){
        tournament{
            participants(query: {
                page: $page,
                perPage: $perPage,
                sortBy: $sortBy,
                filter: $filter
            }, isAdmin: $isAdmin){
                {pageInfo}
                nodes{
                    ${Schema.attendee}
                }
            }
        }
    }
}`;
exports.eventAttendees2 = `query EventAttendees($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: EventEntrantPageQueryFilter){
    event(id: $id){
        entrants(query: {
            page: $page,
            perPage: $perPage,
            sortBy: $sortBy,
            filter: $filter
        }){
            {pageInfo}
            nodes{
                participants{
                    ${Schema.attendee}
                }
            }
        }
    }
}`;
