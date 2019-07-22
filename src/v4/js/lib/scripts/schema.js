"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = `
score{
	label
	value
	displayValue
}
`;
exports.TournamentLink = `
discord
facebook
`;
exports.PageInfo = `
total
totalPages
page
perPage
sortBy
filter
`;
exports.Image = `
id
width
height
ratio
type
url
isOriginal
entity
entityId
uploadedBy
`;
exports.Videogame = `
id
name
slug
displayName
images {
	${exports.Image}
}
`;
exports.league = `
id
name
slug
startAt
endAt
shortSlug
url(relative: false)
`;
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
exports.tournament = `
id
name
slug
shortSlug
images{
	${exports.Image}
}
city
postalCode
addrState
countryCode
region
venueAddress
venueName
gettingThere
lat
lng
timezone
startAt
endAt
contactEmail
contactTwitter
contactPhone
ownerId`;
exports.event = `
id
name
slug
state
startAt
numEntrants
checkInBuffer
checkInDuration
checkInEnabled
isOnline
teamNameAllowed
teamManagementDeadline
videogame {
	${exports.Videogame}
}
`;
exports.phase = `
id
name
numSeeds
groupCount`;
exports.phaseGroup = `
id
displayIdentifier
firstRoundTime
state
phaseId
waveId
tiebreakOrder`;
// smash.gg participant
exports.attendeeContactInfo = `
id
city
state
stateId
country
countryId
name
nameFirst
nameLast
zipcode`;
exports.player = `
id
prefix
gamerTag
color
twitterHandle
twitchStream
youtube
region
state
country
nameDisplay
gamerTagChangedAt
images {
	${exports.Image}
}
`;
// smash.gg participant
exports.attendee = `
id
player {
	${exports.player}
}
gamerTag
prefix
createdAt
claimed
verified
playerId
phoneNumber
contactInfo{
	${exports.attendeeContactInfo}
}
connectedAccounts
events{
	id	
}`;
exports.entrant = `
id
name
eventId
skill
participants{
	${exports.attendee}	
}`;
exports.user = `
id
gamerTag
prefix
color
twitchStream
twitterHandle
youtube
region
state
country
gamerTagChangedAt`;
exports.setSlots = `
slots(includeByes:false){
	id
	standing{
		placement
		stats{
			${exports.Stats}
		}
	}
	entrant{
		id
		name
		participants{
			id
			playerId
		}
	}
}
`;
exports.set = `
id
eventId
phaseGroupId
displayScore  
fullRoundText
round
startedAt
completedAt
winnerId
totalGames
state
lPlacement
wPlacement
${exports.setSlots}
`;
// NOTE: totalGames is not legit, use slot.standing.stats.score.value
exports.game = `
id
state
winnerId
orderNum
selections{
	selectionType
	selectionValue
	entrantId
	participantId
}`;
exports.seeds = `
id
entrantId
placeholderName
seedNum
placement
isBye
players{
	id
}`;
exports.standing = `
id
placement
entrant{ 
	${exports.entrant}
}
stats{
	${exports.Stats}
}
`;
exports.venue = `
venueName
venueAddress
city
addrState
countryCode`;
exports.organizer = `
ownerId
contactEmail
contactTwitter
contactPhone
contactInfo`;
exports.stream = `
id
eventId
tournamentId
streamName
numSetups
streamSource
streamType
streamTypeId
isOnline
enabled
followerCount
removesTasks
streamStatus
streamGame
streamLogo`;
