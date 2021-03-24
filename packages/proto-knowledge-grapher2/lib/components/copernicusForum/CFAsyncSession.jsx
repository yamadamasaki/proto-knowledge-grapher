import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const sessionName = '非同期セッション'
const sessionComponentName = 'CFAsyncSession'

const CFAsyncSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  const sections = [
    {name: '解説', programId, sectionId, subsection: 'async-guidance', componentName: 'KGTextDiagramSubsession'},
    {name: '対話', programId, sectionId, subsection: 'async-dialogue', componentName: 'KGAssignmentSubsession'},
    {name: 'チーム', programId, sectionId, subsection: 'async-dialogue', componentName: 'KGTeamsSubsession'},
    {name: 'モブグラフィティ', programId, sectionId, subsection: 'async-mob', componentName: 'KGTextDiagramSubsession'},
  ]

  const spec = {
    sessionName,
    sessionComponentName,
    sections,
    'async-guidance': { // なくてもいいんじゃない?
      sectionName: '解説',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTextEditable: {groups: ['admins']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['admins']},
      isDiagramReadable: {groups: ['members']},
    },
    'async-dialogue': { // 解説があれば, テキストやダイアログは不要?
      sectionName: '対話',
      diagramComponentName: 'CFFrameworkDiagramSection',
      isTeamDefinable: {groups: ['admins']},
      isTeamAnswerable: {groups: ['members']},
      delegatedComponentName: 'KGAnswerSubsession',
      isTextEditable: {groups: ['admins']},
      isTextReadable: {groups: ['members']},
      isDiagramSavable: {groups: ['admins']},
      isDiagramReadable: {groups: ['members']},
    },
    'async-dialogue-answer': {
      sectionName: '対話',
      diagramComponentName: 'CFNetworkDiagramSection',
      // テキストはなし
      isDiagramSavable: {groups: ['admins']}, // 実際には KGAnswerSubsession で設定
      isDiagramReadable: {groups: ['members']},
    },
    'async-mob': {
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
        <Helmet><title>Async Session ({sectionId})</title></Helmet>
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
                subsection: 'async-chat',
                isChattable: {groups: ['members']},
                isReadable: {groups: ['members']},
              },
            }}/>
          </React.Fragment>
        </Components.KGSessionStart>
      </React.Fragment>
  )
}

registerComponent({name: 'CFAsyncSession', component: CFAsyncSession})
