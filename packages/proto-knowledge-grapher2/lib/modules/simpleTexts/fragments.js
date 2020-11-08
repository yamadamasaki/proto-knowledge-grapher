import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment SimpleTextFragment on SimpleText {
        _id
        title
        htmlText
    }
`)

registerFragment(/*gql*/`
    fragment SimpleTextAllFragment on SimpleText {
        _id
        createdAt
        title
        programId
        sectionId
        htmlText
    }
`)
