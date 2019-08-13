import { IEvent, IEventData } from './IEvent'
import { IStandingData } from './IStanding'

export interface ILeague {
	getId(): number

	getName(): string

	getSlug(): string

	getUrl(): string

	getStartAt(): number

	getEndAt(): number

	getShortSlug(): string

	getEvents(): Promise<IEvent[]>
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
			nodes: IStandingData[]
		}
	}
}

export interface ILeagueEventData {
	league: {
		events: {
			nodes: IEventData[]
		}
	}
}
