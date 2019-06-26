import _ from 'lodash'
import log from './util/Logger'

import { Event, IEvent } from './Event'
import { Phase, IPhase } from './Phase'
import { PhaseGroup, IPhaseGroup } from './PhaseGroup'
import { Entrant, IEntrant } from './Entrant'
import { Attendee, IAttendee } from './Attendee'
import { GGSet, IGGSet } from './GGSet'

import NI from './util/NetworkInterface'
import * as queries from './scripts/leagueQueries'

export class League implements ILeague.League {
  id: number
  name: string
  slug: string
  url: string

  constructor(
    id: number,
    name: string,
    slug: string,
    url: string,
  ) {
    this.id = id
    this.name = name
    this.slug = slug
    this.url = url
  }

  static parse(data: ILeague.LeagueData): League {
    return new League(
      data.id,
      data.name,
      data.slug,
      data.url,
    )
  }

  static parseFull(data: ILeague.Data): League {
    return League.parse(data.league)
  }

  static async getById(id: number): Promise<League> {
    log.info('Getting League with id %s', id)
    let data: ILeague.Data = await NI.query(queries.league, { id })
    return League.parseFull(data)
  }

  static async get(slug: string): Promise<League> {
    log.info('Getting League with slug "%s"', slug)
    let data: ILeague.Data = await NI.query(queries.leagueBySlug, { slug })
    return League.parseFull(data)
  }

  getId(): number {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getSlug(): string {
    return this.slug
  }

  getUrl(): string {
    return this.url
  }

  async getEvents(): Promise<Event[]> {
    const { id, name } = this
    log.info('Getting Events for League [%s :: %s]', id, name)
    let data: ILeague.LeagueEventData = await NI.query(queries.leagueEvents, { id })
    let events = data.league.events.map(event => Event.parse(event))
    return events
  }

  async getPhases(): Promise<Phase[]> {
    const { id, name } = this
    log.info('Getting Phases for League [%s :: %s]', id, name)
    let data: ILeague.LeaguePhaseData = await NI.query(queries.leaguePhases, { id })
    let events = data.league.events
    let phases: Phase[] = _.flatten(events.map(event => event.phases.map(phase => Phase.parse(phase, event.id))))
    return phases
  }

  async getPhaseGroups(): Promise<PhaseGroup[]> {
    const { id, name } = this
    log.info('Getting Phase Groups for League [%s :: %s]', id, name)
    let data: ILeague.LeaguePhaseGroupData = await NI.query(queries.leaguePhaseGroups, { id })
    let events = data.league.events
    let phaseGroups: PhaseGroup[] = _.flatten(events.map(event => event.phaseGroups.map(group => PhaseGroup.parse(group))))
    return phaseGroups
  }

  async getSets(options: IGGSet.SetOptions = IGGSet.getDefaultSetOptions()): Promise<GGSet[]> {
    log.info('Getting Sets for League [%s :: %s]', this.id, this.name)

    log.warn('Puilling Sets for large or massive Leagues may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Sets')
    let pgs = await this.getPhaseGroups()
    let sets = await NI.clusterQuery(pgs, 'getSets', options)
    return _.flatten(sets)
  }

  async getEntrants(options: IEntrant.EntrantOptions = IEntrant.getDefaultEntrantOptions()): Promise<Entrant[]> {
    log.info('Getting Entrants for League [%s :: %s]', this.id, this.name)

    log.warn('Puilling Entrants for large or massive Leagues may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Entrants')
    let pgs = await this.getPhaseGroups()
    let entrants = await NI.clusterQuery(pgs, 'getEntrants', options)
    entrants = _.uniq(entrants)
    return _.flatten(entrants)
  }

  async getAttendees(options: IAttendee.AttendeeOptions = IAttendee.getDefaultAttendeeOptions()): Promise<Attendee[]> {
    log.info('Getting Attendees for League [%s :: %s]', this.id, this.name)

    log.warn('Puilling Attendees for large or massive Leagues may lead to long execution times and lowered usability. It is recommended to pull from Event if you are targetting a single event\'s Attendees')
    let pgs = await this.getPhaseGroups()
    let attendees = await NI.clusterQuery(pgs, 'getAttendees', options)
    attendees = _.uniqWith(attendees, (a1: Attendee, a2: Attendee) => Attendee.eq(a1, a2))
    return _.flatten(attendees)
  }
}

export namespace ILeague {
  export interface League {
    id: number
    name: string
    slug: string
    url: string
    getId(): number
    getName(): string
    getSlug(): string
    getUrl(): string
    getEvents(): Promise<Event[]>
    getPhases(): Promise<Phase[]>
    getPhaseGroups(): Promise<PhaseGroup[]>

    /*
    getSets(options: IGGSet.SetOptions) : Promise<GGSet[]>
    getIncompleteSets(options: IGGSet.SetOptions) : Promise<GGSet[]>
    getCompletedSets(options: IGGSet.SetOptions) : Promise<GGSet[]>
    getSetsXMinutesBack(minutesBack: number, options: IGGSet.SetOptions) : Promise<GGSet[]>
    getEntrants(options: IEntrant.EntrantOptions) : Promise<Entrant[]>
    getAttendees(options: IAttendee.AttendeeOptions) : Promise<Attendee[]>
    */
  }

  export interface Data {
    league: LeagueData
  }

  export interface LeagueData {
    id: number
    name: string
    slug: string
    url: string
  }

  export interface LeagueEventData {
    league: {
      events: IEvent.EventData[]
    }
  }

  export interface LeaguePhaseData {
    league: {
      events: {
        id: number,
        phases: IPhase.PhaseData[]
      }[]
    }
  }

  export interface LeaguePhaseGroupData {
    league: {
      events: {
        id: number,
        phaseGroups: IPhaseGroup.PhaseGroup[]
      }[]
    }
  }

  export interface LeagueAttendeeData {
    league: {
      participants: IAttendee.AttendeeData[]
    }
  }

  export interface LeagueEntrantData {
    league: {
      events: {
        entrant: IEntrant.EntrantData[]
      }[]
    }
  }

  export interface LeagueSetData {
    league: {
      events: {
        phaseGroups: {
          paginatedSets: {
            pageInfo?: {
              totalPages: number
            },
            nodes: IGGSet.SetData[]
          }
        }[]
      }[]
    }
  }
}
