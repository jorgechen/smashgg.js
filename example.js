const smashgg = require('./')
smashgg.initialize('aa9b496a9c5c9ffa19a1c0135df8eda0')
require('dotenv').config()
require('colors')

// smashgg.setLogLevel('queries')
const { Event, League } = smashgg

;(async () => {
  const leagueSlug = 'the-2019-mortal-kombat-pro-kompetition'
  const league = await League.get(leagueSlug)
  console.info(league.getName())
  const events = await league.getEvents()
  const event = events[0]
  console.info(event)

  const standings = await event.getStandingsRaw()
  console.info(`Found ${standings.length} standings`)
  // console.info(JSON.stringify(standings.slice(0, 2), null, 2))

  // Each standing has a player
  const newStandings = []
  const newPlayers = []
  standings.forEach(standing => {
    const newStanding = {
      sggId: standing.id,
      rank: standing.placement,
    }
    const { player } = standing.entrant.participants[0]
    const newPlayer = {
      sggId: player.id,
      team: player.prefix,
      handle: player.gamerTag,
      twitter: player.twitterHandle,
      twitch: player.twitchStream,
      youtube: player.youtube,
      country: player.country,
      state: player.state,
      portrait: player.images[0].url, // TODO get best one
    }
    console.log(newStanding)
    console.log(newPlayer)
    newStandings.push(newStanding)
    newPlayers.push(newPlayer)
  })
  return true // exit async
})()
