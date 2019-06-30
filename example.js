const smashgg = require('./')
smashgg.initialize('aa9b496a9c5c9ffa19a1c0135df8eda0')
require('dotenv').config()
require('colors')

// smashgg.setLogLevel('queries')
const { Event, League } = smashgg

;(async function () {
  const leagueSlug = 'the-2019-mortal-kombat-pro-kompetition'
  const league = await League.get(leagueSlug)
  console.info(league.getName())
  const events = await league.getEvents()
  const event = events[0]
  console.info(event)

  // an event's standings
  const standings = await event.getStandings()
  console.info(JSON.stringify(standings.slice(0, 3), null, 2))
  for (let i in standings) {
    const { placement, entrant } = standings[i]
    console.info(placement, "\t", entrant.name)
  }

  // an event's sets
  let sets = await event.getSets2()
  console.info('Got %s sets played', sets.length)
  console.info(JSON.stringify(sets.slice(sets.length - 4), null, 2))
  console.info('Set Results:')
  for (var i in sets) {
    console.info(`${String(sets[i].getFullRoundText()).magenta}: ${String(sets[i].getDisplayScore()).green}`)
  }

  return true // exit async
})()
