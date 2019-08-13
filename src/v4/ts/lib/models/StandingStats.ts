
import {IStandingStats, IStandingScore} from '../interfaces/IStanding'

export class StandingStats implements IStandingStats{
	public static parse(data: IStandingStats): StandingStats {
		return new StandingStats(data.score)
	}

	public score: IStandingScore

	constructor(score: IStandingScore){
		this.score = score
	}

	public getScore(): IStandingScore{
		return this.score
	}
}
