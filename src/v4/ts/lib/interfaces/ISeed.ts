
export interface ISeed{
	/*
	id: number,
	entrantId: number,
	placeholderName: string,
	seedNumber: number,
	placement: number,
	isBye: boolean
	*/

	getId(): number,
	getEntrantId(): number,
	getPlaceholderName(): string,
	getSeedNumber(): number,
	getPlacement(): number,
	getIsBye(): boolean
}

export interface ISeedDataFull{
	seed: ISeedData[]
}

export interface ISeedData{
	id: number,
	entrantId: number,
	placeholderName: string,
	seedNumber: number,
	placement: number,
	isBye: boolean
}

export interface ISeedOptions{
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
