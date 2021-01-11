import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment KGChatFragment on KGChat {
        _id
        title
        text
        userId
    }
`)

registerFragment(/*gql*/`
    fragment KGChatAllFragment on KGChat {
        _id
        createdAt
        userId
        title
        programId
        sectionId
        text
    }
`)
