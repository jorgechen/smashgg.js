"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stats = "\nscore{\n\tlabel\n\tvalue\n\tdisplayValue\n}\n";
exports.TournamentLink = "\ndiscord\nfacebook\n";
exports.PageInfo = "\ntotal\ntotalPages\npage\nperPage\nsortBy\nfilter\n";
exports.Image = "\nid\nwidth\nheight\nratio\ntype\nurl\nisOriginal\nentity\nentityId\nuploadedBy\n";
exports.player = "\nid\nprefix\ngamerTag\ncolor\ntwitterHandle\ntwitchStream\nyoutube\nregion\nstate\ncountry\nnameDisplay\ngamerTagChangedAt\nimages {\n\t" + exports.Image + "\n}\n";
exports.Videogame = "\nid\nname\nslug\ndisplayName\nimages {\n\t" + exports.Image + "\n}\n";
exports.league = "\nid\nname\nslug\nstartAt\nendAt\nshortSlug\nurl(relative: false)\n";
exports.tournament = "\nshortSlug\nimages{\n\t" + exports.Image + "\n}\nid\nname\nslug\ncity\npostalCode\naddrState\ncountryCode\nregion\nvenueAddress\nvenueName\ngettingThere\nlat\nlng\ntimezone\nstartAt\nendAt\ncontactEmail\ncontactTwitter\ncontactPhone\nownerId";
exports.event = "\nvideogame {\n\t" + exports.Videogame + "\n}\nid\nname\nslug\nstate\nstartAt\nnumEntrants\ncheckInBuffer\ncheckInDuration\ncheckInEnabled\nisOnline\nteamNameAllowed\nteamManagementDeadline";
exports.phase = "\nid\nname\nnumSeeds\ngroupCount";
exports.phaseGroup = "\nid\ndisplayIdentifier\nfirstRoundTime\nstate\nphaseId\nwaveId\ntiebreakOrder";
// smash.gg participant
exports.attendeeContactInfo = "\nid\ncity\nstate\nstateId\ncountry\ncountryId\nname\nnameFirst\nnameLast\nzipcode";
// smash.gg participant
exports.attendee = "\nplayer {\n\t" + exports.player + "\n}\nid\ngamerTag\nprefix\ncreatedAt\nclaimed\nverified\nplayerId\nphoneNumber\ncontactInfo{\n\t" + exports.attendeeContactInfo + "\n}\nconnectedAccounts\nevents{\n\tid\t\n}";
exports.entrant = "\nid\nname\neventId\nskill\nparticipants{\n\t" + exports.attendee + "\t\n}";
exports.user = "\nid\ngamerTag\nprefix\ncolor\ntwitchStream\ntwitterHandle\nyoutube\nregion\nstate\ncountry\ngamerTagChangedAt";
exports.setSlots = "\nslots(includeByes:false){\n\tstanding{\n\t\tplacement\n\t\tstats{\n\t\t\t" + exports.stats + "\n\t\t}\n\t}\n\tid\n\tentrant {\n\t\tid\n\t\tname\n\t\tparticipants {\n\t\t\tplayerId\n\t\t\tid\n\t\t}\n\t}\n}";
exports.set = "\nlPlacement\nwPlacement\nid\neventId\nphaseGroupId\ndisplayScore  \nfullRoundText\nround\nstartedAt\ncompletedAt\nwinnerId\ntotalGames\nstate\n" + exports.setSlots + "\n";
// NOTE: totalGames is not legit, use slot.standing.stats.score.value
exports.game = "\nid\nstate\nwinnerId\norderNum\nselections{\n\tselectionType\n\tselectionValue\n\tentrantId\n\tparticipantId\n}";
exports.seeds = "\nid\nentrantId\nplaceholderName\nseedNum\nplacement\nisBye\nplayers{\n\tid\n}";
exports.standings = "\nid\nentrantId\t\nplaceholderName\t\nseedNum\t\nplacement\nisBye\nplayers{\t\n\tid\t\n}\t\nstandings{\t\n\tstats{\t\n\t\tscore{\t\n\t\t\tlabel\t\n\t\t\tvalue\t\n\t\t}\t\n\t}\t\n}";
exports.venue = "\nvenueName\nvenueAddress\ncity\naddrState\ncountryCode";
exports.organizer = "\nownerId\ncontactEmail\ncontactTwitter\ncontactPhone\ncontactInfo";
exports.stream = "\nid\neventId\ntournamentId\nstreamName\nnumSetups\nstreamSource\nstreamType\nstreamTypeId\nisOnline\nenabled\nfollowerCount\nremovesTasks\nstreamStatus\nstreamGame\nstreamLogo";
