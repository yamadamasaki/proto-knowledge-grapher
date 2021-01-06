import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const sessionName = '非同期セッション'

const CFAsyncSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Async Session ({sectionId})</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sectionId={sectionId}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSectionMenu sectionNames={[
          '解説', 'お題', 'チーム・グラフィング',
        ]}/>

        <Components.KGSectionHeader sectionName='解説'/>
        <Components.SimpleTextSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'introduction',
            isEditable: {groups: ['admins']},
            isReadable: {groups: ['members']},
          },
        }}/>

        <Components.KGSectionHeader sectionName='お題'/>
        <Components.GoogleFormsSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'questionnaire',
            isDefinable: {groups: ['admins']},
            isAnswerable: {groups: ['members']},
          },
        }}/>

        <Components.KGSectionHeader sectionName='チーム・グラフィング'/>
        <Components.KGTeamSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'teams',
            isEditable: {groups: ['admins']},
            delegatedCollectionName: 'CFNetworkDiagrams',
            delegatedComponentName: 'CFNetworkDiagramSubsession',
            subsessionName: `${sessionName} - チーム・グラフィング`,
          },
        }}/>
      </React.Fragment>
  )
}

registerComponent({name: 'CFAsyncSession', component: CFAsyncSession})
