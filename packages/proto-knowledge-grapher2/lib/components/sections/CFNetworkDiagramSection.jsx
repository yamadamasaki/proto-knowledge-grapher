import React, {useEffect, useRef, useState} from 'react'
import {Components, registerComponent, useCreate2, useMulti2, useUpdate2, withCurrentUser} from 'meteor/vulcan:core'
import {
  DiagramComponent,
  DiagramContextMenu,
  Inject,
  OverviewComponent,
  PrintAndExport,
  SymbolPaletteComponent,
  UndoRedo,
  AnnotationConstraints,
} from '@syncfusion/ej2-react-diagrams'
import {ItemDirective, ItemsDirective, ToolbarComponent} from '@syncfusion/ej2-react-navigations'
import {Helmet} from 'react-helmet'

const findParams = (children, sectionId) => {
  if (!children || children.length === 0) return null
  const found = children.find(it => it.id === sectionId)
  if (found) return found
  return children.map(it => findParams(it.children, sectionId)).find(it => it != null)
}

const CFNetworkDiagramSection = ({match, currentUser}) => {
  const {params} = match
  const collectionName = params.collectionName || 'CFNetworkDiagrams'
  const {programId, sectionId, subsection} = params
  const {id} = params
  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]
  if (subsection) selector.push({subsection: {_eq: subsection}})
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}
  const {results, refetch} = useMulti2({
    collectionName,
    fragmentName: 'CFNetworkDiagramFragment',
    input: {filter},
    //pollInterval: 500,
  })
  if (results && results.length === 0) results[0] = {programId, sectionId, subsection}

  const [updateDocument, {loading: loading_u}] = useUpdate2({collectionName, fragmentName: 'CFNetworkDiagramFragment'})
  const [createDocument, {loading: loading_c}] = useCreate2({collectionName, fragmentName: 'CFNetworkDiagramFragment'})
  const [error, setError] = useState()

  const doc = results && results[0] || {}

  const {results: programs, loading_program} = useMulti2(
      {collectionName: 'Programs', fragmentName: 'ProgramFragment', input: {filter: {_id: {_eq: programId}}}},
  )
  const program = programs && programs[0] && programs[0].structure
  const {nodeLabels, edgeLabels} = findParams((program || []).children, sectionId) || {}

  const basicShapes = (nodeLabels || []).map(nodeLabel => (
      {
        id: `node-template-${nodeLabel}`,
        shape: {type: 'Basic', shape: 'Rectangle'},
        annotations: [
          {
            offset: {x: 0.5, y: 0}, content: nodeLabel, constraints: AnnotationConstraints.ReadOnly,
            horizontalAlignment: 'Center', verticalAlignment: 'Bottom', style: {bold: true},
          },
          {
            offset: {x: 0.5, y: 0.5}, content: '発言',
            horizontalAlignment: 'Center', verticalAlignment: 'Center',
          },
          {
            offset: {x: 0.5, y: 1}, content: currentUser.slug, constraints: AnnotationConstraints.ReadOnly,
            horizontalAlignment: 'Center', verticalAlignment: 'Top', style: {italic: true},
          },
        ],
        symbolInfo: {description: {text: nodeLabel}},
      }
  ))

  const points = {sourcePoint: {x: 0, y: 0}, targetPoint: {x: 40, y: 40}}

  const connectors = (edgeLabels || []).map(edgeLabel => (
      {
        id: 'SingleStraight', type: 'Straight', ...points, targetDecorator: {shape: 'Arrow'},
        annotations: [
          {
            content: edgeLabel, constraints: AnnotationConstraints.ReadOnly,
            horizontalAlignment: 'Center', verticalAlignment: 'Center',
          },
        ],
      }
  ))

  const palettes = [
    {id: 'basic', expanded: true, symbols: basicShapes, title: '発言', iconCss: 'e-ddb-icons e-basic'},
    {id: 'connectors', expanded: true, symbols: connectors, title: '発言間の関係性', iconCss: 'e-ddb-icons e-connector'},
  ]

  const diagram = useRef()

  useEffect(() => {
    setTimeout(() => renderComplete(), 0)
  })

  const renderComplete = () => {
    if (!diagram || !diagram.current) return
    if (doc && doc.diagram) diagram.current.loadDiagram(doc.diagram)
  }

  const saveDiagram = async () => {/*ToDo*/
    doc.diagram = diagram.current.saveDiagram()
    try {
      doc._id ?
          await updateDocument({input: {id: doc._id, data: {diagram: doc.diagram}}}) :
          await createDocument({input: {data: doc}})
      refetch()
    } catch (e) {
      setError(e)
    }
  }

  const onToolbarClicked = textContent => {
    switch (textContent) {
      case 'undo':
        diagram.current.undo()
        break
      case 'redo':
        diagram.current.redo()
        break
      case 'save':
        saveDiagram().then(() => {
        })
        break
      case 'export':
        diagram.current.exportDiagram({
          mode: 'Download',
          region: 'PageSettings',
          multiplePage: false,
          fileName: 'Export',
          margin: {left: 10, top: 10, bottom: 10, right: 10},
        })
        break
      case 'print':
        diagram.current.print({
          mode: 'Data',
          region: 'PageSettings',
          multiplePage: true,
          margin: {left: 10, top: 10, bottom: 10, right: 10},
        })
        break
      default:
        break
    }
  }

  return (
      <React.Fragment>
        <Helmet><title>Async Session {sectionId} - {subsection})</title></Helmet>
        {doc.title && <h2>{doc.title}</h2>}
        <SymbolPaletteComponent id='palette' expandMode='Multiple' symbolHeight={80} symbolWidth={80}
                                scrollSettings={{horizontalOffset: 100, verticalOffset: 50}} palettes={palettes}
                                getSymbolInfo={symbol => symbol.symbolInfo}/>
        {
          error ? <Components.Flash message={error}/> :
              [loading_c, loading_u, loading_program].some(it => it === true) ? <Components.Loading/> :
                  <React.Fragment>
                    <DiagramComponent id='diagram' width='100%' height='1000px' ref={diagram}
                                      contextMenuSettings={{show: true}}
                                      historyChange={e => console.log({e})}>
                      <Inject services={[UndoRedo, DiagramContextMenu, PrintAndExport]}/>
                    </DiagramComponent>
                    <OverviewComponent id="overview" style={{top: '30px'}} sourceID="diagram" width={'100%'}
                                       height={'150px'}/>
                  </React.Fragment>
        }
        <ToolbarComponent id='toolbar' onClick={e => {
          onToolbarClicked(e.target.textContent)
        }}>
          <ItemsDirective>
            <ItemDirective text='undo'/>
            <ItemDirective text='redo'/>
            <ItemDirective type="Separator"/>
            <ItemDirective text='save'/>
            <ItemDirective text='export'/>
            <ItemDirective text='print'/>
          </ItemsDirective>
        </ToolbarComponent>
      </React.Fragment>
  )
}

registerComponent({name: 'CFNetworkDiagramSection', component: CFNetworkDiagramSection, hocs: [withCurrentUser]})
