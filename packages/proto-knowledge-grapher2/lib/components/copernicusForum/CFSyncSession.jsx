import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const sessionName = '同期セッション'

const CFSyncSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Sync Session ({sectionId})</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sectionId={sectionId}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSectionMenu sectionNames={[
          '解説', 'お題', 'モブ・グラフィティ', '(ソロ｜ペア）・グラフィティ',
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

        <Components.KGSectionHeader sectionName='モブ・グラフィティ'/>
        <Components.CFFrameworkDiagramSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'mobWork',
            isSavable: {groups: ['admins']},
          },
        }}/>

        <Components.KGSectionHeader sectionName='(ソロ｜ペア）・グラフィティ'/>
        <Components.KGTeamSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'soloWork',
            isEditable: {groups: ['admins']},
            delegatedCollectionName: 'SimpleDiagrams',
            delegatedComponentName: 'CFFrameworkDiagramSubsession',
            subsessionName: `${sessionName} - (ソロ｜ペア）・グラフィティ`,
          },
        }}/>
      </React.Fragment>
  )
}
registerComponent({name: 'CFSyncSession', component: CFSyncSession})
