import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment ProgramFragment on Program {
        _id
        title
        structure
    }
`)
