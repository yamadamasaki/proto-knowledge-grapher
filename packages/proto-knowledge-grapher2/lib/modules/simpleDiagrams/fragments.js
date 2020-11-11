import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment SimpleDiagramFragment on SimpleDiagram {
        _id
        title
    }
`)

registerFragment(/*gql*/`
    fragment SimpleDiagramAllFragment on SimpleDiagram {
        _id
        createdAt
        title
        programId
        sectionId
    }
`)
