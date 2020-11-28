import React from 'react'
import {registerComponent, Components} from 'meteor/vulcan:lib'

const CFSyncSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <h1>CFSyncSession</h1>
        <Components.CFFrameworkDiagramSection match={{params: {programId, sectionId, subsection: 'purpose'}}}/>
      </React.Fragment>
  )
}
registerComponent({name: 'CFSyncSession', component: CFSyncSession})
