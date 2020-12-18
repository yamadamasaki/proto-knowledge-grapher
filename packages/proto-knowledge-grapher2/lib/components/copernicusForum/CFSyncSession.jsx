import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:lib'

const CFSyncSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <h1>同期セッション</h1>
        <Components.CFFrameworkDiagramSection match={{params: {programId, sectionId, subsection: 'purpose'}}}/>
      </React.Fragment>
  )
}
registerComponent({name: 'CFSyncSession', component: CFSyncSession})
