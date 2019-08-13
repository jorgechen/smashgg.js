export const stats = `
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
startAt
endAt
shortSlug
url(relative: false)
`

export const tournament = `
shortSlug
images{
	${Image}
}
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
videogame {
	${Videogame}
}
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
teamManagementDeadline`

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

// smash.gg participant
export const attendee = `
player {
	${player}
}
id
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
	standing{
		placement
		stats{
			${stats}
		}
	}
	id
	entrant {
		id
		name
		participants {
			playerId
			id
		}
	}
}`

export const set = `
lPlacement
wPlacement
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

export const standings = `
id
entrantId
placeholderName
seedNum
placement
isBye
players{
	id
}
standings{
	stats{
		score{
			label
			value
		}
	}
}`

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
