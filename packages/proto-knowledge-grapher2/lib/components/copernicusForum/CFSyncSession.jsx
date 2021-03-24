import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const sessionName = '同期セッション'
const sessionComponentName = 'CFSyncSession'

const CFSyncSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  const sections = [
    {name: '解説', programId, sectionId, subsection: 'sync-guidance', componentName: 'KGTextDiagramSubsession'},
    {name: '課題', programId, sectionId, subsection: 'sync-questionnaire', componentName: 'KGAssignmentSubsession'},
    {name: 'アサイン', programId, sectionId, subsection: 'sync-questionnaire', componentName: 'KGTeamsSubsession'},
    {name: 'モブグラフィティ', programId, sectionId, subsection: 'sync-mob', componentName: 'KGTextDiagramSubsession'},
  ]

  const spec = {
    sessionName,
    sessionComponentName,
    sections,
    'sync-guidance': {
      sectionName: '解説',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTextEditable: {groups: ['admins']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['admins']},
      isDiagramReadable: {groups: ['members']},
    },
    'sync-questionnaire': {
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
    'sync-questionnaire-answer': {
      sectionName: '課題',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTextEditable: {groups: ['admins']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['admins']},
      isDiagramReadable: {groups: ['members']},
    },
    'sync-mob': {
      sectionName: 'モブグラフィティ',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTextEditable: {groups: ['members']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['members']},
      isDiagramReadable: {groups: ['members']},
    },
  }

  return (
      <React.Fragment>
        <Helmet><title>Sync Session ({sectionId})</title></Helmet>
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
                subsection: 'sync-chat',
                isChattable: {groups: ['members']},
                isReadable: {groups: ['members']},
              },
            }}/>
          </React.Fragment>
        </Components.KGSessionStart>
      </React.Fragment>
  )
}
registerComponent({name: 'CFSyncSession', component: CFSyncSession})
