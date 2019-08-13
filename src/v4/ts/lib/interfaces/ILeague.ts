import { Event, IEvent } from '../Event'
import { IStandings } from '../Standings'

export interface ILeague {
	getId(): number

	getName(): string

	getSlug(): string

	getUrl(): string

	getStartAt(): number

	getEndAt(): number

	getShortSlug(): string

	getEvents(): Promise<Event[]>
}

export interface ILeagueData {
	league: ILeagueAttributes
}

export interface ILeagueAttributes {
	id: number
	name: string
	slug: string
	url: string
	startAt: number
	endAt: number
	shortSlug: string
}

export interface ILeagueStandingData {
	league: {
		standings: {
			nodes: IStandings.StandingData[]
		}
	}
}

export interface ILeagueEventData {
	league: {
		events: {
			nodes: IEvent.EventData[]
		}
	}
}