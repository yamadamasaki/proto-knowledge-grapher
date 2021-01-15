import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment KGChatFragment on KGChat {
        _id
        messages {
          who
          when
          text
        }
    }
`)

registerFragment(/*gql*/`
    fragment KGChatFullFragment on KGChat {
        _id
        createdAt
        userId
        title
        programId
        sectionId
        subsection
        messages {
          who
          when
          text
        }
    }
`)
