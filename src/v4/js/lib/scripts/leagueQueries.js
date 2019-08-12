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
exports.league = "query LeagueQuery($id: ID!){\n  league(id: $id){\n    " + Schema.league + "\n  }\n}";
exports.leagueBySlug = "query LeagueQuery($slug: String) {\n  league(slug: $slug){\n    " + Schema.league + "\n  }\n}";
exports.leagueEntrants = "query LeagueEntrants($id: ID!, $page: Int, $perPage: Int, $sortBy: String, $filter: EventEntrantPageQueryFilter){\n  league(id: $id){\n    events{\n      entrants(query: {\n        page: $page,\n        perPage: $perPage,\n        sortBy: $sortBy,\n        filter: $filter\n      }){\n        {pageInfo}\n        nodes{\n          " + Schema.entrant + "\n        }\n      }\n    }\n  }\n}";
exports.leagueEvents = "query LeagueEvents($id: ID!){\n  league(id: $id){\n    events{\n    \tnodes {\n      \t" + Schema.event + "\n      }\n      pageInfo {\n      \t" + Schema.PageInfo + "\n      }\n    }\n  }\n}";
exports.leaguePhases = "query LeaguePhases($id: ID!){\n  league(id: $id){\n    events{\n    \tnodes{\n\t\t\t\tid\n\t\t\t\tphases{\n\t\t\t\t\t" + Schema.phase + "\n\t\t\t\t}\n\t\t\t}\n\t\t\tpageInfo{\n\t\t\t\t" + Schema.PageInfo + "\n\t\t\t}\n    }\n  }   \n}";
exports.leaguePhaseGroups = "query LeaguePhaseGroups($id: ID!){\n  league(id: $id){\n    events{\n    \tnodes{\n\t\t\t\tphaseGroups{\n\t\t\t\t\t" + Schema.phaseGroup + "\n      \t}\n      }\n\t\t\tpageInfo{\n\t\t\t\t" + Schema.PageInfo + "\n\t\t\t}\n    }\n  }   \n}";
/** WARNING THIS DOES NOT WORK CURRENTLY DUE TO RECURSIVE LIMITATIONS, Use leaguePhaseGroupIds instead **/
exports.leagueSets = "query LeagueSets($id: ID!){\n  league(id: $id){\n    events{\n\t\t\tnodes {\n\t\t\t\tphaseGroups{\n\t\t\t\t\tsets{\n\t\t\t\t\t\t" + Schema.set + "\n\t\t\t\t\t}\n\t\t\t\t}\n      }\n\t\t\tpageInfo{\n\t\t\t\t" + Schema.PageInfo + "\n\t\t\t}\n    }\n  }   \n}";
exports.leaguePhaseGroupIds = "query PhaseGroupIdQuery($id: ID!){\n  league(id: $id){\n    events{\n      id\n      phaseGroups{\n        id\n      }\n    }\n  }\n}";
exports.leagueStandings = "query LeagueStandings($id: ID!, $page: Int, $perPage: Int){\n    league(id: $id){\n        standings(query: {\n            page: $page,\n            perPage: $perPage,\n        }){\n            nodes{\n                " + Schema.standings + "\n            }\n            {pageInfo}\n        }\n    }\n}\n";
