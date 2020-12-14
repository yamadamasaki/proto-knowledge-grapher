import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment CFAsyncSessionFragment on CFAsyncSession {
        _id
        title
        teams {
          name
          players
        }
    }
`)

registerFragment(/*gql*/`
    fragment CFAsyncSessionAllFragment on CFAsyncSession {
        _id
        createdAt
        title
        programId
        sectionId
        teams
    }
`)
