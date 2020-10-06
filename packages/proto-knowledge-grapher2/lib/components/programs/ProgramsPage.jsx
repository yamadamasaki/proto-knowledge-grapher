import React, {useRef} from 'react'
import {registerComponent, useSingle2} from 'meteor/vulcan:core'
import {SidebarComponent, TreeViewComponent} from '@syncfusion/ej2-react-navigations'
import {Programs} from '../../modules/programs'
import {v1 as uuidv1} from 'uuid'

const generateNodeId = () => uuidv1()

const children2array = children => {
  return children.map(node => {
    const template = {
      nodeId: generateNodeId(),
      nodeText: node.name,
      iconCss: 'icon-circle-thin icon',
    }
    if (node.children) template.nodeChild = children2array(node.children)
    return template
  })
}

const ProgramsPage = ({match}) => {
  const {document} = useSingle2({
    collection: Programs,
    fragmentName: 'ProgramFragment',
    input: {id: match.params._id},
  })

  const structure = document && document.structure

  const data = structure ? [
    {
      nodeId: generateNodeId(),
      nodeText: structure.title,
      iconCss: 'icon-microchip icon',
      nodeChild: children2array(structure.children),
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
                  <div>
                    <TreeViewComponent id='main-treeview' ref={treeView} fields={fields} expandOn='Click'/>
                  </div>
                </div>
              </SidebarComponent>
              <div className="main-content" id="main-text">
                <div className='sidebar-content'>
                  <h2 className='sidebar-heading'> Responsive Sidebar With Treeview</h2>
                  <p className='paragraph-content'> This is a graphical aid for visualising and categorising the site,
                    in the style of an expandable and collapsable treeview component. It auto-expands to display the
                    node(s),
                    if any, corresponding to the currently viewed title, highlighting that node(s) and its ancestors.
                    Load-on-demand when expanding nodes is available where supported (most graphical browsers), falling
                    back to a full-page reload. MediaWiki-supported caching, aside from squid, has been considered so
                    that unnecessary re-downloads of content are avoided where possible. The complete expanded/collapsed
                    state of the treeview persists across page views in most situations.</p>
                  <p className='paragraph-content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                    id est laborum.</p>
                  <div className='line'></div>
                  <h2 className='sidebar-heading'>Lorem Ipsum Dolor</h2>
                  <p className='paragraph-content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  <div className='line'></div>
                  <h2 className='sidebar-heading'> Lorem Ipsum Dolor</h2>
                  <p className='paragraph-content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <div className='line'></div>
                  <h2 className='sidebar-heading'> Lorem Ipsum Dolor</h2>
                  <p className='paragraph-content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
  )
}

registerComponent({name: 'ProgramsPage', component: ProgramsPage})

