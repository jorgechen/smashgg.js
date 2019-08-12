import { Entrant, IEntrant } from './Entrant'
import {User} from './User'
import NI from './util/NetworkInterface'

export class Standings implements IStandings.Standings{
    id: number | null
    placement: number | null
    entrant: Entrant
    stats: IStandings.Stats

    constructor(
        id: number | null, 
        placement: number | null, 
        entrant: Entrant,
        stats: IStandings.Stats,
    ){
        this.id = id
        this.placement = placement
        this.entrant = entrant
        this.stats = stats
    }

  static parse(data: IStandings.StandingData, eventId: number = -1) : Standings {
    return new Standings(
      data.id,
      data.placement,
      Entrant.parse(data.entrant),
      StandingsStats.parse(data.stats),
    )
  }
}

export class StandingsStats implements IStandings.Stats{
    score: IStandings.Score

    constructor(score: IStandings.Score){
        this.score = score
    }

  static parse(data: IStandings.Stats) : StandingsStats{
    return new StandingsStats(data.score)
  }
}

export namespace IStandings{
    export interface Standings{
        id: number | null,
        placement: number | null,
        entrant: Entrant
        stats: Stats
    }

    export interface StandingData{
        id: number | null,
        placement: number | null,
        entrant: IEntrant.EntrantData
        stats: Stats
    }

    export interface Stats{
        score: Score
    }

    export interface Score{
        label: string,
        value: number
        displayValue: string
    }

    export interface StandingsOptions{
        page?: number | null,
        perPage?: number | null,
        sortBy?: string | null,
        filter?: null | {
			id?: number
			entrantName?: string
			checkInState?: number
			phaseGroupId?: number[]
			phaseId?: number[]
			eventId?: number
			search?: {
				fieldsToSearch: string[]
				searchString: string
			}
		}
    }
}