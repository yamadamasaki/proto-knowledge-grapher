import React, {useEffect, useRef, useState} from 'react'
import {Components, registerComponent, useCreate2, useMulti2, useUpdate2, withCurrentUser} from 'meteor/vulcan:core'
import {
  AnnotationConstraints,
  DiagramComponent,
  DiagramContextMenu,
  Inject,
  OverviewComponent,
  PrintAndExport,
  UndoRedo,
} from '@syncfusion/ej2-react-diagrams'
import {ItemDirective, ItemsDirective, ToolbarComponent} from '@syncfusion/ej2-react-navigations'
import {v1 as uuidv1} from 'uuid'
import {isPermitted} from '../common/IfIHave'
import ErrorBoundary from '../common/ErrorBoundary'
import {DialogComponent} from '@syncfusion/ej2-react-popups'

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
  const {isSavable, isReadable} = params

  if ((!isSavable || !isSavable.length) && (!isReadable || isReadable.length)) return <div/>

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
  const {nodeLabels, edgeLabels, type} = findParams((program || []).children, sectionId) || {}

  const diagram = useRef()

  useEffect(() => {
    const timer = setTimeout(() => renderComplete(), 0)
    return () => clearTimeout(timer) // cleanup
  }, [doc.diagram])

  const renderComplete = () => {
    const root = '__ROOT__'
    const rootNode = {
      id: root,
      width: 120, height: 40, offsetX: diagram.current.diagramCanvas.clientWidth/2, offsetY: 80,
      shape: {type: 'Basic', shape: 'Rectangle'},
      annotations: [{content: root, constraints: AnnotationConstraints.ReadOnly}],
      style: {fill: '#6BA5D7', strokeColor: 'white'},
    }
    if (!diagram || !diagram.current) return
    if (doc && !doc._id) diagram.current.loadDiagram(diagram.current.saveDiagram())
    if (doc && doc.diagram) diagram.current.loadDiagram(doc.diagram)
    if (!diagram.current.getNodeObject(root).id) diagram.current.add(rootNode)
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
      default:
        break
    }
  }

  const globalMenuItems = ['export', 'print']
  if (isPermitted(currentUser, isSavable)) globalMenuItems.unshift('save')
  const popupMenuItems = ['overview',]

  const menuItems = () => {
    const items = []
    const addItem = item => items.push({text: item, id: item, target: '.e-diagramcontent'})
    const addSeparator = () => items.push({separator: true})
    if (edgeLabels) edgeLabels.forEach(addItem)
    addSeparator()
    if (nodeLabels) nodeLabels.forEach(addItem)
    addSeparator()
    globalMenuItems.forEach(addItem)
    addSeparator()
    popupMenuItems.forEach(addItem)
    return items
  }

  const contextMenuSettings = {
    show: true,
    items: menuItems(),
    showCustomMenuOnly: false,
  }

  const addEdge = event => {
    const item = event.item.id
    const {x, y} = event.event
    const selectedNode = diagram.current.selectedItems.nodes[0]
    const sourcePoint = {x, y}
    const targetPoint = selectedNode ?
        {x: selectedNode.offsetX, y: selectedNode.offsetY + selectedNode.actualSize.height / 2 + 40} :
        {x: x + 80, y: y + 80}
    const edge = {
      id: `edge-${item}-${uuidv1()}`,
      type: 'Straight',
      [type === 'association' ? 'targetDecorator' : 'sourceDecorator']: {shape: 'Arrow'},
      [type === 'association' ? 'sourceDecorator' : 'targetDecorator']: {shape: 'None'},
      annotations: [
        {
          content: item, constraints: AnnotationConstraints.ReadOnly,
          horizontalAlignment: 'Center', verticalAlignment: 'Center',
        },
      ],
    }
    diagram.current.add(
        selectedNode ?
            {sourceID: selectedNode.id, targetPoint, ...edge} :
            {sourcePoint, targetPoint, ...edge},
    )
  }

  const addNode = event => {
    const item = event.item.id
    const {x, y} = event.event
    const selectedEdge = diagram.current.selectedItems.connectors[0]
    const nodeId = `node-${item}-${uuidv1()}`
    const node = {
      id: nodeId,
      width: 50, height: 50, offsetX: x, offsetY: y,
      shape: {type: 'Basic', shape: 'Rectangle'},
      annotations: [
        {
          offset: {x: 0.5, y: 0}, content: event.element.id, constraints: AnnotationConstraints.ReadOnly,
          horizontalAlignment: 'Center', verticalAlignment: 'Bottom', style: {bold: true},
        },
        {
          offset: {x: 0.5, y: 0.5}, content: '発言', style: {textWrapping: 'Wrap'},
          horizontalAlignment: 'Center', verticalAlignment: 'Center',
        },
        {
          offset: {x: 0.5, y: 1}, content: currentUser.username, constraints: AnnotationConstraints.ReadOnly,
          horizontalAlignment: 'Center', verticalAlignment: 'Top', style: {italic: true},
        },
      ],
    }
    diagram.current.add(node)
    if (!selectedEdge.sourceID) selectedEdge.sourceID = nodeId
    else selectedEdge.targetID = nodeId
  }

  const menuClicked = event => {
    const item = event.item.id
    if (edgeLabels.includes(item)) addEdge(event)
    else if (nodeLabels.includes(item)) addNode(event)
    else onToolbarClicked(item)
  }

  const menuWillOpen = event => {
    const nNodeSelected = diagram.current.selectedItems.nodes.length
    const nEdgeSelected = diagram.current.selectedItems.connectors.length
    if (nNodeSelected !== 1) edgeLabels.forEach(item => event.hiddenItems.push(item))
    if (nEdgeSelected !== 1) nodeLabels.forEach(item => event.hiddenItems.push(item))
    if (nNodeSelected === 1 && nEdgeSelected === 1) {
      edgeLabels.forEach(item => event.hiddenItems.push(item))
      nodeLabels.forEach(item => event.hiddenItems.push(item))
    }
  }

  const [visibleOverview, setVisibleOverview] = useState(true)
  const closeOverview = () => setVisibleOverview(false)

  if (error) return <Components.Flash message={error}/>
  if ([loading_c, loading_u, loading_program].some(it => it === true)) return <Components.Loading/>

  return (
      <React.Fragment>
        <div><Components.KGWatchers match={{params: {programId, sectionId, subsection}}}/></div>
        <ErrorBoundary>
          <React.Fragment>
            {doc.title && <h2>{doc.title}</h2>}
            <DiagramComponent id='diagram' width='100%' height='1000px' ref={diagram}
                              contextMenuSettings={contextMenuSettings} contextMenuClick={menuClicked}
                              contextMenuOpen={menuWillOpen}>
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
          </ItemsDirective>
        </ToolbarComponent>
      </React.Fragment>
  )
}

registerComponent({name: 'CFNetworkDiagramSection', component: CFNetworkDiagramSection, hocs: [withCurrentUser]})
