"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Schema = __importStar(require("./schema"));
exports.tournament = "query TournamentQuery($id: ID!){\n    tournament(id: $id){\n        " + Schema.tournament + "\n    }\n}";
exports.tournamentBySlug = "query TournamentQuery($slug: String) {\n    tournament(slug: $slug){\n        " + Schema.tournament + "\n    }\n}";
exports.tournamentOrganizer = "query tournamentOrganizer($id: ID!){\n    tournament(id: $id){\n        " + Schema.organizer + "\n    }   \n}";
exports.tournamentVenue = "query tournamentVenue($id: ID!){\n    tournament(id: $id){\n\t\t" + Schema.venue + "\n\t}\t\n}";
exports.tournamentEntrants = "query TournamentEntrants($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: EventEntrantPageQueryFilter){\n    tournament(id: $id){\n        events{\n            entrants(query: {\n                page: $page,\n                perPage: $perPage,\n                sortBy: $sortBy,\n                filter: $filter\n            }){\n                {pageInfo}\n                nodes{\n                    " + Schema.entrant + "\n                }\n            }\n        }\n    }\n}";
exports.tournamentAttendees = "query TournamentAttendees($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: ParticipantPageFilter){\n    tournament(id: $id){\n        participants(query: {\n            page: $page,\n            perPage: $perPage,\n            sortBy: $sortBy,\n            filter: $filter\n        },\n        isAdmin: false){\n            {pageInfo}\n            nodes{\n                " + Schema.attendee + "\n            }\n        }\n    }  \n}";
exports.tournamentAttendeeSearch = "query SearchTournamentAttendeesQuery($id:ID!, $smashtag:String){\n    tournament(id:$id){\n      participants(query:{\n        page: 1,\n        perPage: 50,\n        sortBy: \"asc\",\n        filter:{\n          search:{\n            fieldsToSearch:[\"gamerTag\"],\n            searchString: $smashtag\n          }\n        }\n      }, isAdmin:false){\n        nodes{\n          " + Schema.attendee + "\n        }\n      }\n    }\n  }";
exports.tournamentAttendeeSearchByPrefix = "query SearchTournamentAttendeesBySponsorQuery($id:ID!, $sponsor:String){\n    tournament(id:$id){\n      participants(query:{\n        page: 1,\n        perPage: 50,\n        sortBy: \"asc\",\n        filter:{\n          search:{\n            fieldsToSearch:[\"prefix\"],\n            searchString: $sponsor\n          }\n        }\n      }, isAdmin:false){\n        nodes{\n          " + Schema.attendee + "\n        }\n      }\n    }\n  }";
exports.tournamentEvents = "query TournamentEvents($id: ID!){\n    tournament(id: $id){\n        events:{\n            " + Schema.event + "\n        }\n    }\n}";
exports.tournamentPhases = "query TournamentPhases($id: ID!){\n    tournament(id: $id){\n        events{\n            id\n            phases{\n                " + Schema.phase + "\n            }\n        }\n    }   \n}";
exports.tournamentPhaseGroups = "query TournamentPhaseGroups($id: ID!){\n    tournament(id: $id){\n        events{\n            phaseGroups{\n                " + Schema.phaseGroup + "\n            }\n        }\n    }   \n}";
/** WARNING THIS DOES NOT WORK CURRENTLY DUE TO RECURSIVE LIMITATIONS, Use tournamentPhaseGroupIds instead **/
exports.tournamentSets = "query TournamentSets($id: ID!){\n    tournament(id: $id){\n        events{\n            phaseGroups{\n                sets{\n                    " + Schema.set + "\n                }\n            }\n        }\n    }   \n}";
exports.tournamentPhaseGroupIds = "query PhaseGroupIdQuery($id: ID!){\n    tournament(id: $id){\n        events{\n            id\n            phaseGroups{\n                id\n            }\n        }\n    }\n}";
