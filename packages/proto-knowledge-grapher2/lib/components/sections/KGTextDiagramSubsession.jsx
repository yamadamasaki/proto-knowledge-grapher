import React, {useState} from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'
import {findSingleDocument} from '../utils/documents'

const sessionSpecCollectionName = 'KGSessionSpecs'
const sessionSpecFragmentName = 'KGSessionSpecsFragment'

const KGTextDiagramSubsession = ({match}) => {
  const {programId, sectionId, subsection} = match.params

  const diagramComponents = {
    CFFrameworkDiagramSection: Components.CFFrameworkDiagramSection,
    CFNetworkDiagramFragment: Components.CFNetworkDiagramSection,
  }

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
  const diagramComponent = diagramComponents[mySpec.diagramComponentName]

  if (!diagramComponent) return <Components.Flash
      message={`Undefined Diagram Component: ${mySpec.diagramComponentName}`}/>

  return (
      <React.Fragment>
        <Helmet><title>{sessionName} ({mySpec.sectionName})</title></Helmet>
        <Components.KGBreadCrumbs programId={programId} sectionId={sectionId} sessionComponent={sessionComponentName} sessionName={sessionName}/>
        <Components.KGSessionHeader sessionName={sessionName}/>

        <Components.KGSectionMenu sections={sections}/>
        <Components.KGSectionHeader sectionName={mySpec.sectionName}/>

        <Components.KGChatButton match={{
          params: {
            programId,
            sectionId,
            subsection: `${subsection}-chat`,
            isChattable: {groups: ['members']},
            isReadable: {groups: ['members']},
          },
        }}/>

        <Components.DraftJSTextSection match={{
          params: {
            programId,
            sectionId,
            subsection,
            isEditable: mySpec.isTextEditable,
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
                    subsection,
                    isSavable: mySpec.isDiagramSavable,
                    isReadable: mySpec.isDiagramReadable,
                  },
                },
              },
          )
        }
      </React.Fragment>
  )
}

registerComponent({name: 'KGTextDiagramSubsession', component: KGTextDiagramSubsession})
