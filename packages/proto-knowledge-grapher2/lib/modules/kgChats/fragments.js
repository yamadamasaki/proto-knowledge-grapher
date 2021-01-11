import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment KGChatFragment on KGChat {
        _id
        title
        text
    }
`)

registerFragment(/*gql*/`
    fragment KGChatAllFragment on KGChat {
        _id
        createdAt
        title
        programId
        sectionId
        text
    }
`)
