"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = "\nscore{\n\tlabel\n\tvalue\n\tdisplayValue\n}\n";
exports.TournamentLink = "\ndiscord\nfacebook\n";
exports.PageInfo = "\ntotal\ntotalPages\npage\nperPage\nsortBy\nfilter\n";
exports.Image = "\nid\nwidth\nheight\nratio\ntype\nurl\nisOriginal\nentity\nentityId\nuploadedBy\n";
exports.Videogame = "\nid\nname\nslug\ndisplayName\nimages {\n\t" + exports.Image + "\n}\n";
exports.league = "\nid\nname\nslug\nstartAt\nendAt\nshortSlug\nurl(relative: false)\n";
// addrState
// city
// countryCode
// currency
// details
// emailDirections
// emailInstructions
// emailNote
// endAt
// gettingThere
// hashtag
// hasOnlineEvents
// hideAdmins
// includeQRCheckIn
// includeQRCode
// isOnline
// lat
// lng
// mapsPlaceId
// ownerId
// postalCode
// prizes
// qrCodeRedirect
// qrCodeRedirectType
// region
// registrationClosesAt
// defaultTab
// rules
// shortSlug
// startAt
// state
// submissionState
// timezone
// tournamentType
// venueAddress
// venueName
// showStandings
// finalEventId
// numProgressingToFinalEvent
exports.tournament = "\nid\nname\nslug\nshortSlug\nimages{\n\t" + exports.Image + "\n}\ncity\npostalCode\naddrState\ncountryCode\nregion\nvenueAddress\nvenueName\ngettingThere\nlat\nlng\ntimezone\nstartAt\nendAt\ncontactEmail\ncontactTwitter\ncontactPhone\nownerId";
exports.event = "\nid\nname\nslug\nstate\nstartAt\nnumEntrants\ncheckInBuffer\ncheckInDuration\ncheckInEnabled\nisOnline\nteamNameAllowed\nteamManagementDeadline\nvideogame {\n\t" + exports.Videogame + "\n}\n";
exports.phase = "\nid\nname\nnumSeeds\ngroupCount";
exports.phaseGroup = "\nid\ndisplayIdentifier\nfirstRoundTime\nstate\nphaseId\nwaveId\ntiebreakOrder";
// smash.gg participant
exports.attendeeContactInfo = "\nid\ncity\nstate\nstateId\ncountry\ncountryId\nname\nnameFirst\nnameLast\nzipcode";
exports.player = "\nid\nprefix\ngamerTag\ncolor\ntwitterHandle\ntwitchStream\nyoutube\nregion\nstate\ncountry\nnameDisplay\ngamerTagChangedAt\nimages {\n\t" + exports.Image + "\n}\n";
// smash.gg participant
exports.attendee = "\nid\nplayer {\n\t" + exports.player + "\n}\ngamerTag\nprefix\ncreatedAt\nclaimed\nverified\nplayerId\nphoneNumber\ncontactInfo{\n\t" + exports.attendeeContactInfo + "\n}\nconnectedAccounts\nevents{\n\tid\t\n}";
exports.entrant = "\nid\nname\neventId\nskill\nparticipants{\n\t" + exports.attendee + "\t\n}";
exports.user = "\nid\ngamerTag\nprefix\ncolor\ntwitchStream\ntwitterHandle\nyoutube\nregion\nstate\ncountry\ngamerTagChangedAt";
exports.setSlots = "\nslots(includeByes:false){\n\tid\n\tstanding{\n\t\tplacement\n\t\tstats{\n\t\t\t" + exports.Stats + "\n\t\t}\n\t}\n\tentrant{\n\t\tid\n\t\tname\n\t\tparticipants{\n\t\t\tid\n\t\t\tplayerId\n\t\t}\n\t}\n}\n";
exports.set = "\nid\neventId\nphaseGroupId\ndisplayScore  \nfullRoundText\nround\nstartedAt\ncompletedAt\nwinnerId\ntotalGames\nstate\n" + exports.setSlots + "\n";
// NOTE: totalGames is not legit, use slot.standing.stats.score.value
exports.game = "\nid\nstate\nwinnerId\norderNum\nselections{\n\tselectionType\n\tselectionValue\n\tentrantId\n\tparticipantId\n}";
exports.seeds = "\nid\nentrantId\nplaceholderName\nseedNum\nplacement\nisBye\nplayers{\n\tid\n}";
exports.standing = "\nid\nplacement\nentrant{ \n\t" + exports.entrant + "\n}\nstats{\n\t" + exports.Stats + "\n}\n";
exports.venue = "\nvenueName\nvenueAddress\ncity\naddrState\ncountryCode";
exports.organizer = "\nownerId\ncontactEmail\ncontactTwitter\ncontactPhone\ncontactInfo";
exports.stream = "\nid\neventId\ntournamentId\nstreamName\nnumSetups\nstreamSource\nstreamType\nstreamTypeId\nisOnline\nenabled\nfollowerCount\nremovesTasks\nstreamStatus\nstreamGame\nstreamLogo";
