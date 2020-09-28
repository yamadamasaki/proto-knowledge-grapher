import React from 'react'
import {registerComponent, useSingle2} from 'meteor/vulcan:core'
import Programs from '../../modules/programs/collection'

const ProgramsPage = ({match}) => {
  const {document} = useSingle2({
    collection: Programs,
    fragmentName: 'ProgramFragment',
    input: {id: match.params._id},
  })
  console.log({document})
  return <h1>ProgramsPage</h1>
}

registerComponent({name: 'ProgramsPage', component: ProgramsPage})

