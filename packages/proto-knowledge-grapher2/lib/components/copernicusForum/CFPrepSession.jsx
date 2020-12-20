import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:lib'
import {Helmet} from 'react-helmet'

const CFPrepSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Prep Session ({sectionId})</title></Helmet>
        <h1>準備セッション</h1>
        <h2>ねらい</h2>
        <Components.SimpleTextSection match={{params: {programId, sectionId, subsection: 'purpose', isEditable: 'admins', isReadable: 'members'}}}/>
        <h2>成果物</h2>
        <Components.CFFrameworkDiagramSection match={{params: {programId, sectionId, subsection: 'work'}}}/>
      </React.Fragment>
  )
}

registerComponent({name: 'CFPrepSession', component: CFPrepSession})
