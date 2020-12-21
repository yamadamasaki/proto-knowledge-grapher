import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment GoogleFormFragment on GoogleForm {
        _id
        title
        formUrl
        resultUrl
    }
`)

registerFragment(/*gql*/`
    fragment GoogleFormAllFragment on GoogleForm {
        _id
        createdAt
        title
        programId
        sectionId
        subsection
        formUrl
        resultUrl
    }
`)
