"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentLink = "\ndiscord\nfacebook\n";
exports.PageInfo = "\ntotal\ntotalPages\npage\nperPage\nsortBy\nfilter\n";
exports.Image = "\nid\nwidth\nheight\nratio\ntype\nurl\nisOriginal\nentity\nentityId\nuploadedBy\n";
exports.Videogame = "\nid\nname\nslug\ndisplayName\nimages " + exports.Image + "\n";
exports.league = "\nid\nname\nslug\nurl(relative: false)\n\naddrState\ncity\ncountryCode\ncurrency\ndetails\nemailDirections\nemailInstructions\nemailNote\nendAt\ngettingThere\nhashtag\nhasOnlineEvents\nhideAdmins\nincludeQRCheckIn\nincludeQRCode\nisOnline\nlat\nlng\nmapsPlaceId\nownerId\npostalCode\nprizes\nqrCodeRedirect\nqrCodeRedirectType\nregion\nregistrationClosesAt\ndefaultTab\nrules\nshortSlug\nstartAt\nstate\nsubmissionState\ntimezone\ntournamentType\nvenueAddress\nvenueName\nshowStandings\nfinalEventId\nnumProgressingToFinalEvent\n";
exports.tournament = "\nid\nname\nslug\ncity\npostalCode\naddrState\ncountryCode\nregion\nvenueAddress\nvenueName\ngettingThere\nlat\nlng\ntimezone\nstartAt\nendAt\ncontactEmail\ncontactTwitter\ncontactPhone\nownerId";
exports.event = "\nid\nname\nslug\nstate\nstartAt\nnumEntrants\ncheckInBuffer\ncheckInDuration\ncheckInEnabled\nisOnline\nteamNameAllowed\nteamManagementDeadline";
exports.phase = "\nid\nname\nnumSeeds\ngroupCount";
exports.phaseGroup = "\nid\ndisplayIdentifier\nfirstRoundTime\nstate\nphaseId\nwaveId\ntiebreakOrder";
// smash.gg participant
exports.attendeeContactInfo = "\nid\ncity\nstate\nstateId\ncountry\ncountryId\nname\nnameFirst\nnameLast\nzipcode";
// smash.gg participant
exports.attendee = "\nid\ngamerTag\nprefix\ncreatedAt\nclaimed\nverified\nplayerId\nphoneNumber\ncontactInfo{\n\t" + exports.attendeeContactInfo + "\n}\nconnectedAccounts\nevents{\n\tid\t\n}";
exports.entrant = "\nid\nname\neventId\nskill\nparticipants{\n\t" + exports.attendee + "\t\n}";
exports.user = "\nid\ngamerTag\nprefix\ncolor\ntwitchStream\ntwitterHandle\nyoutube\nregion\nstate\ncountry\ngamerTagChangedAt";
exports.setSlots = "\nslots(includeByes:false){\n\tid\n\tentrant {\n\t\tid\n\t\tname\n\t\tparticipants {\n\t\t\tid\n\t\t}\n\t}\n}";
exports.set = "\nid\neventId\nphaseGroupId\ndisplayScore  \nfullRoundText\nround\nstartedAt\ncompletedAt\nwinnerId\ntotalGames\nstate\n" + exports.setSlots + "\n";
exports.game = "\nid\nstate\nwinnerId\norderNum\nselections{\n\tselectionType\n\tselectionValue\n\tentrantId\n\tparticipantId\n}";
exports.seeds = "\nid\nentrantId\nplaceholderName\nseedNum\nplacement\nisBye\nplayers{\n\tid\n}";
exports.standings = "\nid\nentrantId\nplaceholderName\nseedNum\nplacement\nisBye\nplayers{\n\tid\n}\nstandings{\n\tstats{\n\t\tscore{\n\t\t\tlabel\n\t\t\tvalue\n\t\t}\n\t}\n}";
exports.venue = "\nvenueName\nvenueAddress\ncity\naddrState\ncountryCode";
exports.organizer = "\nownerId\ncontactEmail\ncontactTwitter\ncontactPhone\ncontactInfo";
exports.stream = "\nid\neventId\ntournamentId\nstreamName\nnumSetups\nstreamSource\nstreamType\nstreamTypeId\nisOnline\nenabled\nfollowerCount\nremovesTasks\nstreamStatus\nstreamGame\nstreamLogo";
