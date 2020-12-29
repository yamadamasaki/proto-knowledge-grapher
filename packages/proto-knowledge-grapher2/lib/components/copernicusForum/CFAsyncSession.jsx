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
          'お題', 'チームワーク',
        ]}/>

        <Components.KGSectionHeader sectionName='チームワーク'/>
        <Components.KGTeamSection match={{
          params: {
            programId,
            sectionId,
            subsection: 'teams',
            isEditable: 'admins',
            delegatedCollectionName: 'CFNetworkDiagrams',
            delegatedComponentName: 'CFNetworkDiagramSection',
          }
        }}
        />
      </React.Fragment>
  )
}

registerComponent({name: 'CFAsyncSession', component: CFAsyncSession})
