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
} from '@syncfusion/ej2-react-diagrams'
import {ItemDirective, ItemsDirective, ToolbarComponent} from '@syncfusion/ej2-react-navigations'
import Users from 'meteor/vulcan:users'

const basicShapes = [
  {
    id: 'Rectangle-top',
    shape: {type: 'Basic', shape: 'Rectangle'},
    annotations: [{offset: {x: 0.5, y: 0.1}, verticalAlignment: 'Top'}],
    symbolInfo: {description: {text: 'Top'}},
  }, {
    id: 'Rectangle-center',
    shape: {type: 'Basic', shape: 'Rectangle'},
    annotations: [{offset: {x: 0.5, y: 0.5}, verticalAlignment: 'Center'}],
    symbolInfo: {description: {text: 'Center'}},
  }, {
    id: 'Rectangle-bottom',
    shape: {type: 'Basic', shape: 'Rectangle'},
    annotations: [{offset: {x: 0.5, y: 0.9}, verticalAlignment: 'Bottom'}],
    symbolInfo: {description: {text: 'Bottom'}},
  }, {
    id: 'Ellipse',
    shape: {type: 'Basic', shape: 'Ellipse'},
  }, {
    id: 'Hexagon',
    shape: {type: 'Basic', shape: 'Hexagon'},
  }, {
    id: 'Text',
    shape: {type: 'Text', content: 'Text'},
    width: 80, height: 40,
  },
]

const imageShapes = [
  {
    id: 'causalnet', style: {fill: 'none'},
    shape: {
      type: 'Image',
      source: '/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/causalnet2.png',
      scale: 'None',
    },
    width: 80, height: 80,
  }, {
    id: 'conflict', style: {fill: 'none'},
    shape: {
      type: 'Image',
      source: '/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/conflict.png',
      scale: 'None',
    },
    width: 80, height: 80,
  }]

const points = {sourcePoint: {x: 0, y: 0}, targetPoint: {x: 40, y: 40}}
const connectors = [
  {id: 'SingleOrthogonal', type: 'Orthogonal', ...points, targetDecorator: {shape: 'Arrow'}},
  {id: 'SingleStraight', type: 'Straight', ...points, targetDecorator: {shape: 'Arrow'}},
  {id: 'SingleBezier', type: 'Bezier', ...points, targetDecorator: {shape: 'Arrow'}},
  {
    id: 'BothOrthogonal',
    type: 'Orthogonal', ...points,
    sourceDecorator: {shape: 'Arrow'},
    targetDecorator: {shape: 'Arrow'},
  },
  {
    id: 'BothStraight',
    type: 'Straight', ...points,
    sourceDecorator: {shape: 'Arrow'},
    targetDecorator: {shape: 'Arrow'},
  },
  {id: 'BothBezier', type: 'Bezier', ...points, sourceDecorator: {shape: 'Arrow'}, targetDecorator: {shape: 'Arrow'}},
]

const palettes = [
  {id: 'basic', expanded: true, symbols: basicShapes, title: 'Basic Shapes', iconCss: 'e-ddb-icons e-basic'},
  {id: 'images', expanded: true, symbols: imageShapes, title: 'Image Shapes', iconCss: 'e-ddb-icons e-basic'},
  {id: 'connectors', expanded: true, symbols: connectors, title: 'Connectors', iconCss: 'e-ddb-icons e-connector'},
]

const toArray = permission => !permission ? [] : (!Array.isArray(permission) ? [permission] : permission)
const toBoolean = (user, permission) => Users.isMemberOf(user, toArray(permission))

const CFFrameworkDiagramSection = ({match, currentUser}) => {
  const {params} = match
  const collectionName = params.collectionName || 'SimpleDiagrams'
  const {programId, sectionId, subsection} = params
  const {id} = params
  let {isSavable} = params
  isSavable = toBoolean(currentUser, isSavable)
  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]
  if (subsection) selector.push({subsection: {_eq: subsection}})
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}
  const {results, refetch} = useMulti2({
    collectionName,
    fragmentName: 'SimpleDiagramFragment',
    input: {filter},
    //pollInterval: 500,
  })
  if (results && results.length === 0) results[0] = {programId, sectionId, subsection}

  const [updateDocument, {loading: loading_u}] = useUpdate2({collectionName, fragmentName: 'SimpleDiagramFragment'})
  const [createDocument, {loading: loading_c}] = useCreate2({collectionName, fragmentName: 'SimpleDiagramFragment'})
  const [error, setError] = useState()

  const doc = results && results[0] || {}

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
        {doc.title && <h2>{doc.title}</h2>}
        <SymbolPaletteComponent id='palette' expandMode='Multiple' symbolHeight={80} symbolWidth={80}
                                scrollSettings={{horizontalOffset: 100, verticalOffset: 50}}
                                palettes={palettes}
                                getSymbolInfo={symbol => symbol.symbolInfo}/>
        {
          error ? <Components.Flash message={error}/> :
              [loading_c, loading_u].some(it => it === true) ? <Components.Loading/> :
                  <React.Fragment>
                    <DiagramComponent id='diagram' width='100%' height='1000px' ref={diagram}
                                      contextMenuSettings={{show: true}}>
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
            {isSavable ? <ItemDirective text='save'/> : <div/>}
            <ItemDirective text='export'/>
            <ItemDirective text='print'/>
          </ItemsDirective>
        </ToolbarComponent>
      </React.Fragment>
  )
}

registerComponent({name: 'CFFrameworkDiagramSection', component: CFFrameworkDiagramSection, hocs: [withCurrentUser]})
