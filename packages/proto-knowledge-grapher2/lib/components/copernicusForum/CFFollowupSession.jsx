import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:lib'
import {Helmet} from 'react-helmet'

const CFFollowupSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Followup Session ({sectionId})</title></Helmet>
        <h1>フォローアップ・セッション</h1>
        <Components.CFFrameworkDiagramSection match={{params: {programId, sectionId}}}/>
      </React.Fragment>
  )
}
registerComponent({name: 'CFFollowupSession', component: CFFollowupSession})
