import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:lib'

const CFPrepSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <h1>準備セッション</h1>
        <h2>ねらい</h2>
        <Components.SimpleTextSection match={{params: {programId, sectionId, subsection: 'purpose'}}}/>
        <h2>成果物</h2>
        <Components.CFFrameworkDiagramSection match={{params: {programId, sectionId, subsection: 'work'}}}/>
      </React.Fragment>
  )
}

registerComponent({name: 'CFPrepSession', component: CFPrepSession})
