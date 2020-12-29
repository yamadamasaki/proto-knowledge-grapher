import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment KGTeamFragment on KGTeam {
        _id
        title
        teams {
          name
          players
          teamId
        }
    }
`)

registerFragment(/*gql*/`
    fragment KGTeamAllFragment on KGTeam {
        _id
        createdAt
        title
        programId
        sectionId
        teams
    }
`)
