import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:lib'

const CFPrepSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <h1>ねらい</h1>
        <Components.SimpleTextSection match={{params: {programId, sectionId, subsection: 'purpose'}}}/>
        <h1>成果物</h1>
        <Components.SimpleDiagramSection match={{params: {programId, sectionId, subsection: 'work'}}}/>
      </React.Fragment>
  )
}

registerComponent({name: 'CFPrepSession', component: CFPrepSession})
