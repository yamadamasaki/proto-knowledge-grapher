import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment KGTouchIdFragment on KGTouch {
        _id
        programId
        sectionId
        subsection
        userId
        lastAccessedAt
    }
`)
