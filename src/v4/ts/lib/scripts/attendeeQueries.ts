import * as schema from './schema'

export const singlePlayer  = `query SinglePlayerQuery($id: ID!){
    player(id: $id){
        ${schema.player}
    }
}`

export const getAttendeePhases = `query AttendeePhasesQuery($id: ID!){
    participant(id: $id){
        entrants {
            seeds {
                id
                phase {
                    ${schema.phase}
                }
            }
        }
    }
}`

export const getAttendeePhaseGroups = `query AttendeePhaseGroupsQuery($id: ID!){
    participant(id: $id){
        entrants {
            seeds {
                id
                phaseGroup {
                    ${schema.phaseGroup}
                }
            }
        }
    }
}`
