import React, {useRef} from 'react'
import {registerComponent, useSingle2} from 'meteor/vulcan:core'
import {SidebarComponent, TreeViewComponent} from '@syncfusion/ej2-react-navigations'
import {Programs} from '../../modules/programs'
import {v1 as uuidv1} from 'uuid'

const generateNodeId = () => uuidv1()

const children2array = (children, programId) => {
  return children.map(node => {
    const template = {
      nodeId: node.id,
      nodeText: node.name,
      iconCss: 'icon-circle-thin icon',
      navigateUrl: `/sections/${programId}/${node.collectionName}/${node.id}/${node.componentName}`,
    }
    if (node.children) template.nodeChild = children2array(node.children, programId)
    return template
  })
}

const ProgramsPage = ({match, history}) => {
  const {document} = useSingle2({
    collection: Programs,
    fragmentName: 'ProgramFragment',
    input: {id: match.params.id},
  })

  const structure = document && document.structure
  const data = structure ? [
    {
      nodeId: generateNodeId(),
      nodeText: structure.title,
      iconCss: 'icon-microchip icon',
      nodeChild: children2array(structure.children, match.params.id),
      navigateUrl: '/',
    },
  ] : []

  const width = '290px'
  const target = '.main-content'
  const mediaQuery = '(min-width: 600px)'
  const dockSize = '44px'
  const fields = {dataSource: data, id: 'nodeId', text: 'nodeText', child: 'nodeChild'}

  const onCreate = () => sidebar.current.element.style.visibility = ''
  const onClose = () => treeView.current.collapseAll()
  const toggleClick = () => {
    if (sidebar.current.isOpen) {
      sidebar.current.hide()
      treeView && treeView.current.collapseAll()
    } else {
      sidebar.current.show()
      treeView.current.expandAll()
    }
  }

  const nodeClicked = args => {
    //console.log({nodeClicked: args})
  }

  const sidebar = useRef(null)
  const treeView = useRef(null)

  return (
      <React.Fragment>
        <h1>ProgramsPage</h1>
        <div className="control-section">
          <div id="wrapper">
            <title>Essential JS 2 for React - Sidebar > Sidebar with ListView </title>
            <div className="col-lg-12 col-sm-12 col-md-12">
              <div className='main-header' id='header-section'>
                <ul className='header-list'>
                  <li className='float-left header-style icon-menu' id='hamburger' onClick={toggleClick}></li>
                  <li className='float-left header-style nav-pane'><b>Navigation Pane</b></li>
                  <li className='header-style float-right support border-left'><b>Support</b></li>
                </ul>
              </div>
              <SidebarComponent id="sidebar-treeview" ref={sidebar} width={width} target={target}
                                mediaQuery={mediaQuery} style={{visibility: 'hidden'}} created={onCreate}
                                close={onClose} dockSize={dockSize} enableDock={true}>
                <div className='main-menu'>
                  <TreeViewComponent id='main-treeview' ref={treeView} fields={fields} nodeClicked={nodeClicked} fullRowNavigable/>
                </div>
              </SidebarComponent>
              {structure ?
                  <div className="main-content" id="main-text">
                    <div className='sidebar-content'>
                      <h1 className='sidebar-heading'>{structure.title}</h1>
                      <div className='line'></div>
                      <h2 className='sidebar-heading'>{structure.subtitle}</h2>
                      <p className='paragraph-content'>
                        {structure.fromDate} - {structure.toDate}
                      </p>
                      <div className='line'></div>
                      <h3 className='sidebar-heading'>{structure.organization}</h3>
                      <div className='line'></div>
                    </div>
                  </div> : <div/>
              }
            </div>
          </div>
        </div>
      </React.Fragment>
  )
}

registerComponent({name: 'ProgramsPage', component: ProgramsPage})

