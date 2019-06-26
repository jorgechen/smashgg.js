"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phaseGroupSets = "query PhaseGroupSetsById($id: ID!){\n    phaseGroup(id: $id){\n        sets{\n            id\n            fullRoundText\n            displayScore\n            startedAt\n            completedAt\n        }\n    }\n}";
exports.phaseGroupSets2 = "query PhaseGroupSetsById($id: ID!){\n    phaseGroup(id: $id){\n        sets{\n            id\n            round\n            fullRoundText\n            startedAt\n            completedAt\n            winnerId\n            totalGames\n            state\n        }\n    }\n}";
exports.phaseGroupSetsWithoutEntrants = "query PhaseGroupSetsById($id: ID!){\n    phaseGroup(id: $id){\n        sets{\n            id\n            round\n            displayScore\n            fullRoundText\n            startedAt\n            completedAt\n            winnerId\n            totalGames\n            state\n        }\n    }\n}";
exports.phaseGroupSetsWithEntrants = "query PhaseGroupSetsById($id: ID!){\n    phaseGroup(id: $id){\n        sets{\n            id\n            round\n            displayScore\n            fullRoundText\n            startedAt\n            completedAt\n            winnerId\n            totalGames\n            state\n            slots{\n                id\n                entrant {\n                    id\n                    name\n                    participants {\n                        id\n                    }\n                }\n            }\n        }\n    }\n}";