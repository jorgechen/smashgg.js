import * as Schema from './schema'
export const phase = `
query PhaseQuery($id: id){
	phase(id: $id){
		${Schema.phase}
	}
}
`

export const phaseSeeds = `
query PhaseSeedQuery($id: Int){
	phase(id: $id){
		paginatedSeeds(query: {
			page: {page},
			perPage: {perPage},
			sortBy: {sortBy},
			filters: {filters}
		}){
			{pageInfo}
			nodes{
				${Schema.seeds}
			}
		}
	}	
}`

export const phasePhaseGroups = `
query PhaseGroupsQuery($eventId: Int){
	event(id: $eventId){
		phaseGroup{
			${Schema.phaseGroup}
		}
	}
}`

export const phaseSets = `
query PhaseSets($eventId:Int, $phaseId: Int){
	event(id: $eventId){
	  phaseGroups{
		paginatedSets(
		  page: {page},
		  perPage: {perPage},
		  sortBy: {sortBy}
		  filters: {
			phaseIds:[$phaseId]
		  }
		){
		  {pageInfo}
		  nodes{
			${Schema.set}
		  }
		}
	  }
	}
  }`

export const phaseEntrants = `
query PhaseEntrants($id: Int){
	phase(id: $id){
		paginatedSeeds(query: {
		  page: {page},
		  perPage: {perPage},
		  sortBy: {sortBy},
		  filters: {filters}
		}){
		  {pageInfo},
		  nodes{
			  entrant{
				  ${Schema.entrant}
			  }
		  }
		}
	}	
}`