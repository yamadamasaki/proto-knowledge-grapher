import React, {useState} from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'
import {findSingleDocument} from '../utils/documents'

const sessionSpecCollectionName = 'KGSessionSpecs'
const sessionSpecFragmentName = 'KGSessionSpecsFragment'

const KGAnswerSubsession = ({match}) => {
  const {programId, sectionId, subsection, teamId} = match.params

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

  const {document: teams, loading: l_teams, error: e_teams} = findSingleDocument({
    programId,
    sectionId,
    subsection: subsection.replace(/-answer$/, ''),
    collectionName: 'KGTeams',
    fragmentName: 'KGTeamFragment',
    pollInterval: 0,
  })
  if (l_teams) loadings.spec = l_teams
  if (e_teams) setError(e_teams)

  if (error) return <Components.Flash message={error}/>
  if (Object.values(loadings).some(it => !!it)) return <Components.Loading/>

  const diagramComponents = {
    CFFrameworkDiagramSection: Components.CFFrameworkDiagramSection,
    CFNetworkDiagramSection: Components.CFNetworkDiagramSection,
  }

  const specs = sessionSpec && sessionSpec.specs
  const {sessionName, sessionComponentName, sections} = specs
  const mySpec = specs[subsection] || {}
  const {diagramComponentName} = mySpec
  const diagramComponent = diagramComponents[diagramComponentName]

  if (!diagramComponent)
    return <Components.Flash message={`Undefined Diagram Component: ${diagramComponentName}`}/>

  const team = teams.teams.find(team => team.teamId === teamId)
  if (!team) return <Components.Flash message={`team not found: ${teamId}`}/>

  return (
      <React.Fragment>
        <Helmet><title>{sessionName} / {mySpec.sectionName} / {team.name}</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sectionId={sectionId}
                                  sessionComponent={sessionComponentName} sessionName={sessionName}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSectionMenu sections={sections}/>
        <Components.KGSectionHeader sectionName={mySpec.sectionName+" ("+team.name+")"}/>

        <Components.KGChatButton match={{
          params: {
            programId,
            sectionId,
            subsection: teamId,
            isChattable: {groups: ['members']},
            isReadable: {groups: ['members']},
          },
        }}/>

        <Components.SimpleTextSection match={{
          params: {
            programId,
            sectionId,
            subsection: teamId,
            isEditable: {groups: ['admins'], users: team && team.players},
            isReadable: mySpec.isTextReadable,
          },
        }}/>

        {
          React.createElement(
              diagramComponent,
              {
                match: {
                  params: {
                    programId,
                    sectionId,
                    subsection: teamId,
                    isSavable: {groups: ['admins'], users: team && team.players},
                    isReadable: mySpec.isDiagramReadable,
                  },
                },
              },
          )
        }
      </React.Fragment>
  )
}

registerComponent({name: 'KGAnswerSubsession', component: KGAnswerSubsession})
