import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment KGSessionSpecsFragment on KGSessionSpec {
        _id
        specs
    }
`)

registerFragment(/*gql*/`
    fragment KGSessionSpecsAllFragment on KGSessionSpec {
        _id
        createdAt
        title
        programId
        sectionId
        subsection
        specs
    }
`)
