export const Stats = `
score{
	label
	value
	displayValue
}
`

export const TournamentLink = `
discord
facebook
`

export const PageInfo = `
total
totalPages
page
perPage
sortBy
filter
`

export const Image = `
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
`

export const Videogame = `
id
name
slug
displayName
images {
	${Image}
}
`

export const league = `
id
name
slug
url(relative: false)
`
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

export const tournament = `
id
name
slug
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
ownerId`

export const event = `
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
	${Videogame}
}
`

export const phase = `
id
name
numSeeds
groupCount`

export const phaseGroup = `
id
displayIdentifier
firstRoundTime
state
phaseId
waveId
tiebreakOrder`


// smash.gg participant
export const attendeeContactInfo = `
id
city
state
stateId
country
countryId
name
nameFirst
nameLast
zipcode`

export const player = `
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
	${Image}
}
`

// smash.gg participant
export const attendee = `
id
player {
	${player}
}
gamerTag
prefix
createdAt
claimed
verified
playerId
phoneNumber
contactInfo{
	${attendeeContactInfo}
}
connectedAccounts
events{
	id	
}`


export const entrant = `
id
name
eventId
skill
participants{
	${attendee}	
}`

export const user = `
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
gamerTagChangedAt`

export const setSlots = `
slots(includeByes:false){
	id
	standing{
		placement
		stats{
			${Stats}
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
}`

export const set = `
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
${setSlots}
`
// NOTE: totalGames is not legit, use slot.standing.stats.score.value

export const game = `
id
state
winnerId
orderNum
selections{
	selectionType
	selectionValue
	entrantId
	participantId
}`

export const seeds = `
id
entrantId
placeholderName
seedNum
placement
isBye
players{
	id
}`

export const standing = `
id
placement
entrant{ 
	${entrant}
}
stats{
	${Stats}
}
`

export const venue = `
venueName
venueAddress
city
addrState
countryCode`

export const organizer = `
ownerId
contactEmail
contactTwitter
contactPhone
contactInfo`

export const stream = `
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
streamLogo`
