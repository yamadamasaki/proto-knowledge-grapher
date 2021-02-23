import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const sessionName = 'フォローアップ・セッション'
const sessionComponentName = 'CFFollowupSession'

const CFFollowupSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  const sections = [
    {name: '解説', programId, sectionId, subsection: 'followup-guidance', componentName: 'KGTextDiagramSubsession'},
    {name: '課題', programId, sectionId, subsection: 'followup-questionnaire', componentName: 'KGAssignmentSubsession'},
    {name: 'モブグラフィティ', programId, sectionId, subsection: 'followup-mob', componentName: 'KGTextDiagramSubsession'},
  ]

  const spec = {
    sessionName,
    sessionComponentName,
    sections,
    'followup-guidance': {
      sectionName: '解説',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTextEditable: {groups: ['admins']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['admins']},
      isDiagramReadable: {groups: ['members']},
    },
    'followup-questionnaire': {
      sectionName: '課題',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTeamDefinable: {groups: ['admins']},
      isTeamAnswerable: {groups: ['members']},
      delegatedComponentName: 'KGAnswerSubsession',
      isTextEditable: {groups: ['admins']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['admins']},
      isDiagramReadable: {groups: ['members']},
    },
    'followup-questionnaire-answer': {
      sectionName: '課題',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTextEditable: {groups: ['admins']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['admins']},
      isDiagramReadable: {groups: ['members']},
    },
    'followup-mob': {
      sectionName: 'モブグラフィティ',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTextEditable: {groups: ['admins']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['admins']},
      isDiagramReadable: {groups: ['members']},
    },
  }

  return (
      <React.Fragment>
        <Helmet><title>Followup Session ({sectionId})</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sectionId={sectionId}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSessionStart programId={programId} sectionId={sectionId} spec={spec}
                                   isStartable={{groups: ['admins']}}>
          <React.Fragment>
            <Components.KGSectionMenu sections={sections}/>

            <Components.KGChatButton match={{
              params: {
                programId,
                sectionId,
                subsection: 'followup-chat',
                isChattable: {groups: ['members']},
                isReadable: {groups: ['members']},
              },
            }}/>
          </React.Fragment>
        </Components.KGSessionStart>
      </React.Fragment>
  )
}

registerComponent({name: 'CFFollowupSession', component: CFFollowupSession})
