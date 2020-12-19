import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:lib'
import {Helmet} from 'react-helmet'

const CFSyncSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Sync Session ({sectionId})</title></Helmet>
        <h1>同期セッション</h1>
        <Components.CFFrameworkDiagramSection match={{params: {programId, sectionId}}}/>
      </React.Fragment>
  )
}
registerComponent({name: 'CFSyncSession', component: CFSyncSession})
