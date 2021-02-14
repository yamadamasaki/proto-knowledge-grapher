import {registerFragment} from 'meteor/vulcan:core'

registerFragment(/*gql*/`
    fragment KGWatcherFragment on KGWatcher {
      _id
      programId
      sectionId
      subsection
      watchers
    }
`)
