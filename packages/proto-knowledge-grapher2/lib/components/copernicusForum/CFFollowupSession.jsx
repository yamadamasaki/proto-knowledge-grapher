import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const sessionName = 'フォローアップ・セッション'

const CFFollowupSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Followup Session ({sectionId})</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sectionId={sectionId}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSectionMenu sectionNames={[
          '解説', 'お題', 'モブワーク', '(ソロ｜ペア）ワーク',
        ]}/>

        <Components.KGSectionHeader sectionName='解説'/>
        <Components.SimpleTextSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'introduction',
            isEditable: 'admins',
            isReadable: 'members',
          },
        }}/>

        <Components.KGSectionHeader sectionName='お題'/>
        <Components.GoogleFormsSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'questionnaire',
            isDefinable: 'admins',
            isAnswerable: 'members',
          },
        }}/>

        <Components.KGSectionHeader sectionName='モブワーク'/>
        <Components.CFFrameworkDiagramSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'mobWork',
            isSavable: 'admins',
          }
        }}/>

        <Components.KGSectionHeader sectionName='(ソロ｜ペア）ワーク'/>
        <Components.KGTeamSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'soloWork',
            isEditable: 'admins',
            delegatedCollectionName: 'SimpleDiagrams',
            delegatedComponentName: 'CFFrameworkDiagramSection',
          }
        }}/>
      </React.Fragment>
  )
}
registerComponent({name: 'CFFollowupSession', component: CFFollowupSession})
