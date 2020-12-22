import React from 'react'
import {Components, registerComponent, withAccess} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const CFSyncSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Sync Session ({sectionId})</title></Helmet>
        <h1>同期セッション</h1>
        <Components.CFFrameworkDiagramSection match={{params: {programId, sectionId, isSavable: 'admins'}}}/>
      </React.Fragment>
  )
}

registerComponent( 'CFSyncSession', CFSyncSession, [withAccess, {groups:['members']}])
