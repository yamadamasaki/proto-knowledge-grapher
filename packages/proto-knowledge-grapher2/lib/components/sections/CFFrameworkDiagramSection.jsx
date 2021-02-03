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
import {isPermitted} from '../common/IfIHave'
import {DialogComponent} from '@syncfusion/ej2-react-popups'
import ErrorBoundary from '../common/ErrorBoundary'

const basicShapes = [
  {
    id: 'Rectangle-top',
    shape: {type: 'Basic', shape: 'Rectangle'},
    annotations: [{offset: {x: 0.5, y: 0.1}, verticalAlignment: 'Top', style: {textWrapping: 'Wrap'}}],
    symbolInfo: {description: {text: 'Top'}},
  }, {
    id: 'Rectangle-center',
    shape: {type: 'Basic', shape: 'Rectangle'},
    annotations: [{offset: {x: 0.5, y: 0.5}, verticalAlignment: 'Center', style: {textWrapping: 'Wrap'}}],
    symbolInfo: {description: {text: 'Center'}},
  }, {
    id: 'Rectangle-bottom',
    shape: {type: 'Basic', shape: 'Rectangle'},
    annotations: [{offset: {x: 0.5, y: 0.9}, verticalAlignment: 'Bottom', style: {textWrapping: 'Wrap'}}],
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

const globalMenuItems = ['save', 'export', 'print']
const popupMenuItems = ['overview', 'palette']

const CFFrameworkDiagramSection = ({match, currentUser}) => {
  const {params} = match
  const collectionName = params.collectionName || 'SimpleDiagrams'
  const {programId, sectionId, subsection} = params
  const {id} = params
  const {isSavable, isReadable} = params

  if ((!isSavable || !isSavable.length) && (!isReadable || isReadable.length)) return <div/>

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
    const timer = setTimeout(() => renderComplete(), 0)
    return () => clearTimeout(timer) // cleanup
  }, [doc.diagram])

  const renderComplete = () => {
    if (!diagram || !diagram.current) return
    if (doc && !doc._id) diagram.current.loadDiagram(diagram.current.saveDiagram())
    if (doc && doc.diagram) diagram.current.loadDiagram(doc.diagram)
  }

  const saveDiagram = async () => {/*ToDo*/
    doc.diagram = diagram.current.saveDiagram()
    try {
      doc._id ?
          await updateDocument({input: {id: doc._id, data: {diagram: doc.diagram}}}) :
          await createDocument({input: {data: doc}})
      refetch()
      renderComplete()
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
      case 'overview':
        setVisibleOverview(true)
        break
      case 'palette':
        setVisiblePalette(true)
        break
      default:
        break
    }
  }

  const menuItems = () => {
    const menuItems = []
    const addItem = item => menuItems.push({text: item, id: item, target: '.e-diagramcontent'})
    const addSeparator = () => menuItems.push({separator: true})
    addSeparator()
    globalMenuItems.forEach(addItem)
    addSeparator()
    popupMenuItems.forEach(addItem)
    return menuItems
  }

  const contextMenuSettings = {
    show: true,
    items: menuItems(),
    showCustomMenuOnly: false,
  }

  const menuClicked = event => onToolbarClicked(event.item.id)

  const [visibleOverview, setVisibleOverview] = useState(true)
  const [visiblePalette, setVisiblePalette] = useState(true)
  const closeOverview = () => setVisibleOverview(false)
  const closePalette = () => setVisiblePalette(false)

  if (error) return <Components.Flash message={error}/>
  if ([loading_c, loading_u].some(it => it === true)) return <Components.Loading/>

  return (
      <React.Fragment>
        <ErrorBoundary>
          <React.Fragment>
            {doc.title && <h2>{doc.title}</h2>}
            <DialogComponent width='500px' visible={visiblePalette} header='Palette' allowDragging={true}
                             showCloseIcon={true} close={closePalette}
                             enableResize={true} resizeHandles={['All']}>
              <SymbolPaletteComponent id='palette' expandMode='Multiple' symbolHeight={80} symbolWidth={80}
                                      scrollSettings={{horizontalOffset: 100, verticalOffset: 50}}
                                      palettes={palettes}
                                      getSymbolInfo={symbol => symbol.symbolInfo}/>
            </DialogComponent>
            <DiagramComponent id='diagram' width='100%' height='1000px' ref={diagram}
                              contextMenuSettings={contextMenuSettings} contextMenuClick={menuClicked}>
              <Inject services={[UndoRedo, DiagramContextMenu, PrintAndExport]}/>
            </DiagramComponent>
            <DialogComponent width='300px' visible={visibleOverview} header='Overview' allowDragging={true}
                             showCloseIcon={true} close={closeOverview}
                             enableResize={true} resizeHandles={['All']}>
              <OverviewComponent id="overview" style={{top: '30px'}} sourceID="diagram" width={'100%'}
                                 height={'300px'}/>
            </DialogComponent>
          </React.Fragment>
        </ErrorBoundary>
        <ToolbarComponent id='toolbar' onClick={e => {
          onToolbarClicked(e.target.textContent)
        }}>
          <ItemsDirective>
            <ItemDirective text='undo'/>
            <ItemDirective text='redo'/>
            <ItemDirective type="Separator"/>
            {
              isPermitted(currentUser, isSavable) ? <ItemDirective text='save'/> : <div/>
            }
            <ItemDirective text='export'/>
            <ItemDirective text='print'/>
            <ItemDirective type="Separator"/>
            <ItemDirective text='overview'/>
            <ItemDirective text='palette'/>
          </ItemsDirective>
        </ToolbarComponent>
      </React.Fragment>
  )
}

registerComponent({name: 'CFFrameworkDiagramSection', component: CFFrameworkDiagramSection, hocs: [withCurrentUser]})
