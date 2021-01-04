import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const sessionName = '準備セッション'

const CFPrepSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Prep Session ({sectionId})</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sectionId={sectionId}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSectionMenu sectionNames={[
            'ねらい', 'ゴール', '課題',
        ]}/>

        <Components.KGSectionHeader sectionName='ねらい'/>
        <Components.SimpleTextSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'purpose',
            isEditable: {groups: ['admins']},
            isReadable: {groups: ['members']},
          },
        }}/>

        <Components.KGSectionHeader sectionName='ゴール'/>
        <Components.CFFrameworkDiagramSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'work',
            isSavable: 'admins'
          },
        }}/>

        <Components.KGSectionHeader sectionName='課題'/>
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
