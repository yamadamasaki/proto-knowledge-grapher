import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const sessionName = 'フォローアップ・セッション'

const spec = {
  guidance: {
    sessionName: '解説',
    isTextEditable: {groups: ['admins']},
    isTextReadable: {groups: ['members']},
    isDiagramSavable: {groups: ['admins']},
  },
  questionnaire: {
    sectionName: '課題',
    isTeamDefinable: {groups: ['admins']},
    isTeamAnswerable: {groups: ['members']},
    isTextEditable: {groups: ['admin']},
    isTextReadable: {groups: ['members']},
    isDiagramSavable: {groups: ['admin']},
  },
  mobGraffiti: {
    sectionName: 'モブグラフィティ',
    isSavable: {groups: ['admin']},
    isReadable: {groups: ['members']},
  },
}

const CFFollowupSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Followup Session ({sectionId})</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sectionId={sectionId}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSectionMenu sectionNames={[
          '解説', 'お題', 'モブ・グラフィティ', '(ソロ｜ペア）・グラフィティ',
        ]}/>

        <Components.KGSessionStart programId={programId} sectionId={sectionId} spec={spec}>
          <React.Fragment>

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
                isReadable: {groups: ['members']},
              },
            }}/>

            <Components.KGSectionHeader sectionName='(ソロ｜ペア）・グラフィティ'/>
            <Components.KGTeamSection match={{
              params: {
                programId,
                sectionId,
                subsection: 'soloWork',
                isEditable: {groups: ['admins']},
                delegatedComponentName: 'CFFrameworkDiagramSubsession',
                subsessionName: `${sessionName} - (ソロ｜ペア）・グラフィティ`,
              },
            }}/>

          </React.Fragment>
        </Components.KGSessionStart>
      </React.Fragment>
  )
}

registerComponent({name: 'CFFollowupSession', component: CFFollowupSession})
