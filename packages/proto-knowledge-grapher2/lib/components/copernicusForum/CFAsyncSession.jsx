import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'

const sessionName = '非同期セッション'

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
  teamGraffiti: {
    sectionName: 'チーム・グラフィティ',
    isTeamDefinable: {groups: ['admins']},
    isTeamAnswerable: {groups: ['members']},
    isSavable: {groups: ['admin']},
    isReadable: {groups: ['members']},
  },
}

const CFAsyncSession = ({match}) => {
  const {params} = match
  const {programId, sectionId} = params

  return (
      <React.Fragment>
        <Helmet><title>Async Session ({sectionId})</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sectionId={sectionId}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSessionStart programId={programId} sectionId={sectionId} spec={spec}>
          <React.Fragment>

            <Components.KGSectionMenu sectionNames={[
              '解説', 'お題', 'チーム・グラフィティ',
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

            <Components.KGSectionHeader sectionName='チーム・グラフィティ'/>
            <Components.KGTeamSection match={{
              params: {
                programId,
                sectionId,
                subsection: 'teams',
                isEditable: {groups: ['admins']},
                delegatedComponentName: 'CFNetworkDiagramSubsession',
                subsessionName: `${sessionName} - チーム・グラフィティ`,
              },
            }}/>
          </React.Fragment>
        </Components.KGSessionStart>
      </React.Fragment>
  )
}

registerComponent({name: 'CFAsyncSession', component: CFAsyncSession})
