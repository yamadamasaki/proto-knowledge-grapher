import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const sessionName = '準備セッション'

const spec = {
  guidance: {
    sectionName: 'ねらい',
    isTextEditable: {groups: ['admins']},
    isTextReadable: {groups: ['members']},
    isDiagramSavable: {groups: ['admins']},
  },
  questionnaire: {
    sectionName: '課題',
    isTeamDefinable: {groups: ['admins']},
    isTeamAnswerable: {groups: ['members']},
    // 以下は問い掛け部分の permission
    // isText... があれば showText: true, isDiagram... があれば showDiagram: true
    isTextEditable: {groups: ['admin']},
    isTextReadable: {groups: ['members']},
    isDiagramSavable: {groups: ['admin']},
    // 課題成果物の permission はその先で決める
  },
}

const CFPrepSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Prep Session ({sectionId})</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sectionId={sectionId}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSessionStart programId={programId} sectionId={sectionId} spec={spec}>
          <React.Fragment>

            <Components.KGSectionMenu sectionNames={[
              'ねらい', 'ゴール', '課題',
            ]}/>

            <Components.KGChatButton match={{
              params: {
                programId,
                sectionId,
                subsection: 'chat',
                isChattable: {groups: ['members']},
                isReadable: {groups: ['members']},
              },
            }}/>

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
                isSavable: {groups: ['admins']},
              },
            }}/>

            <Components.KGSectionHeader sectionName='課題'/>
            <Components.GoogleFormsSection match={{
              params: {
                programId,
                sectionId,
                subsection: 'questionnaire',
                isDefinable: {groups: ['admins']},
                isAnswerable: {groups: ['members']},
              },
            }}/>
          </React.Fragment>
        </Components.KGSessionStart>
      </React.Fragment>
  )
}

registerComponent({name: 'CFPrepSession', component: CFPrepSession})
