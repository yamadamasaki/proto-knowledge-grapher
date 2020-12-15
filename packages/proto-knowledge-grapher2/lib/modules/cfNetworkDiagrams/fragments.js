import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment CFNetworkDiagramFragment on CFNetworkDiagram {
        _id
        title
        diagram
    }
`)

registerFragment(/*gql*/`
    fragment CFNetworkDiagramAllFragment on CFNetworkDiagram {
        _id
        createdAt
        title
        programId
        sectionId
        diagram
    }
`)
