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
registerComponent({name: 'CFFollowupSession', component: CFFollowupSession})
