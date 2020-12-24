import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const CFPrepSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Prep Session ({sectionId})</title></Helmet>
        <h1>準備セッション</h1>
        <h2>ねらい</h2>
        <Components.SimpleTextSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'purpose',
            isEditable: 'admins',
            isReadable: 'members',
          },
        }}/>
        <h2>成果物</h2>
        <Components.CFFrameworkDiagramSection
            match={{params: {programId, sectionId, subsection: 'work', isSavable: 'admins'}}}/>
        <h2>宿題</h2>
        <Components.GoogleFormsSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'questionnaire',
            isDefinable: 'admins',
            isAnswerable: 'members',
          },
        }}/>
      </React.Fragment>
  )
}

registerComponent({name: 'CFPrepSession', component: CFPrepSession})
