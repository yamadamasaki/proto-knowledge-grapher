import React from 'react'
import {registerComponent} from 'meteor/vulcan:core'

const ProgramsPage = ({match}) => {
  console.log(match.params.id)
  return <h1>ProgramsPage</h1>
}

registerComponent({name: 'ProgramsPage', component: ProgramsPage})

