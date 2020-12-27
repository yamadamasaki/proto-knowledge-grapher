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
          'お題', '(ソロ｜ペア）ワーク', 'モブワーク',
        ]}/>

        <Components.KGSectionHeader sectionName='モブワーク'/>
        <Components.CFFrameworkDiagramSection match={{
          params: {
            programId,
            sectionId,
            isSavable: 'admins',
          }
        }}/>
      </React.Fragment>
  )
}
registerComponent({name: 'CFSyncSession', component: CFSyncSession})
