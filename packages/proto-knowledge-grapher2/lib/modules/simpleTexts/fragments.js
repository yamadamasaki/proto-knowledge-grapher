import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment SimpleTextFragment on SimpleText {
        _id
        title
        htmlText
    }
`)
