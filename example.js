const _ = require('lodash')
const smashgg = require('./')
require('dotenv').config()
require('colors')
smashgg.initialize(process.env.SMASHGG_API_KEY)

// smashgg.setLogLevel('queries')
const { Attendee, Event, League, Tournament, VideoGame } = smashgg

;(async () => {

  const p1 = await Attendee.getRaw(1141106)
  console.info(JSON.stringify(p1))
  return process.exit()

  // const filter = {
  //   past: true,
  //   // isFeatured: true,
  //   videogameIds: [3200],
  // }
  // const videogames = await VideoGame.getTournamentsRaw(filter)
  // videogames.forEach(({ name, startAt, endAt }) => {
  //   console.log(_.padStart(name, 70), new Date(startAt * 1000), new Date(endAt * 1000))
  // })
  // console.log(`${videogames.length} games found`)
  // console.log(videogames[0])
  // return true

  const leagueSlug = 'the-2019-mortal-kombat-pro-kompetition'
  const league = await League.get(leagueSlug)
  console.info(league)

  // // NOTE: this is currently lacking data like player's points
  // const leagueStandings = await league.getStandingsRaw()
  // console.info(leagueStandings[0])

  const events = await league.getEvents()
  const event = events[0]
  console.info(event)
  const tourney = await event.getTournamentRaw()
  console.info(tourney)

  const placings = await Event.getStandingsRaw(event.id)
  console.info(`Got ${placings.length} placings for event`)
  console.info(placings[0])

  let sets = await event.getSetsRaw()
  console.info('Got %s sets played', sets.length)
  console.info('Sample sets:')
  console.info(JSON.stringify(sets.slice(sets.length - 4), null, 2))

  // event's phases, phaseGroups (aka pools)
  const phaseGroups = await event.getPhaseGroups()
  const phases = await event.getPhases()
  phases[0].getGroupCount()
  console.info(phases)
  console.info(phaseGroups.map(phaseGroup => _.pick(phaseGroup, 'phaseId', 'id')))

  // const standings = await event.getStandingsRaw()
  // console.info(`Found ${standings.length} standings`)
  // // console.info(JSON.stringify(standings.slice(0, 2), null, 2))
  //
  // // Each standing has a player
  // const newStandings = []
  // const newPlayers = []
  // standings.forEach(standing => {
  //   const newStanding = {
  //     sggId: standing.id,
  //     rank: standing.placement,
  //   }
  //   const { player } = standing.entrant.participants[0]
  //   const newPlayer = {
  //     sggId: player.id,
  //     team: player.prefix,
  //     handle: player.gamerTag,
  //     twitter: player.twitterHandle,
  //     twitch: player.twitchStream,
  //     youtube: player.youtube,
  //     country: player.country,
  //     state: player.state,
  //     portrait: player.images[0].url, // TODO get best one
  //   }
  //   console.log(newStanding)
  //   console.log(newPlayer)
  //   newStandings.push(newStanding)
  //   newPlayers.push(newPlayer)
  // })
  return true // exit async
})()
