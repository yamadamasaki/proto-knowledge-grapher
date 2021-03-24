import React, {useState} from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'
import {findSingleDocument} from '../utils/documents'

const sessionSpecCollectionName = 'KGSessionSpecs'
const sessionSpecFragmentName = 'KGSessionSpecsFragment'

const specialMySpec_SectionName = 'チーム'

const KGTeamsSubsession = ({match}) => {
  const {programId, sectionId, subsection} = match.params

  const [error, setError] = useState()
  const loadings = {}

  const {document: sessionSpec, loading: l_spec, error: e_spec} = findSingleDocument({
    programId,
    sectionId,
    collectionName: sessionSpecCollectionName,
    fragmentName: sessionSpecFragmentName,
    pollInterval: 0,
  })
  if (l_spec) loadings.spec = l_spec
  if (e_spec) setError(e_spec)

  if (error) return <Components.Flash message={error}/>
  if (Object.values(loadings).some(it => !!it)) return <Components.Loading/>

  const specs = sessionSpec && sessionSpec.specs
  const {sessionName, sessionComponentName, sections} = specs
  const mySpec = specs[subsection] || {}

  return (
      <React.Fragment>
        <Helmet><title>{sessionName} ({specialMySpec_SectionName})</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sectionId={sectionId}
                                  sessionComponent={sessionComponentName} sessionName={sessionName}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSectionMenu sections={sections}/>
        <Components.KGSectionHeader sectionName={specialMySpec_SectionName}/>

          <div>
            <Components.KGTeamSection match={{
              params: {
                programId,
                sectionId,
                subsection,
                isEditable: mySpec.isTeamDefinable,
                isParticipatable: mySpec.isTeamAnswerable,
                delegatedComponentName: mySpec.delegatedComponentName,
                subsessionName: `${sessionName} - ${mySpec.sectionName}`,
              },
            }}/>
          </div>
      </React.Fragment>
  )
}

registerComponent({name: 'KGTeamsSubsession', component: KGTeamsSubsession})
