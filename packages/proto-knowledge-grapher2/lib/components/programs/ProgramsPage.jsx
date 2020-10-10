import React, {useRef} from 'react'
import {registerComponent, useSingle2} from 'meteor/vulcan:core'
import {ContextMenuComponent, SidebarComponent, TreeViewComponent} from '@syncfusion/ej2-react-navigations'
import {Programs} from '../../modules/programs'
import {v1 as uuidv1} from 'uuid'

const generateNodeId = () => uuidv1()

const children2array = children => {
  return children.map(node => {
    const template = {
      nodeId: node.id,
      nodeText: node.name,
      iconCss: 'icon-circle-thin icon',
    }
    if (node.children) template.nodeChild = children2array(node.children)
    return template
  })
}

const findNode = (nodes, id) => {
  return nodes.find(it => it.id === id) ||
      nodes.map(it => it.children && findNode(it.children, id)).find(it => it != null)
}

const ProgramsPage = ({match, history}) => {
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

  const menuItems = [
    {text: 'open'},
    {separator: true},
    {text: 'activate'},
    {text: 'deactivate'},
    {text: 'delete'},
  ]

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

  const menuClick = args => {
    const selectedNodeId = treeView.current.selectedNodes[0] // ツリーで選択してからコンテキスト・メニューを出さないとだめ
    switch (args.item.text) {
      case 'open':
        if (selectedNodeId) {
          const node = findNode(structure.children, selectedNodeId)
          //history.push("/sections/${node._id}")
        }
        break
      case 'activate':
        if (selectedNodeId) {
          const node = findNode(structure.children, selectedNodeId)
          if (node) {
            const {collectionName, componentName, params} = node
            // mongo で collectionName にドキュメントを作る
            // params を入れる
            // node._id = 作ったドキュメントの id
            // node.url = /sections/{componentName}/{_id}
            // document を保存する
            history.push('/sections/simpleText')
          }
        }
        break
      default:
        console.log('default')
    }
  }

  const beforeOpen = args => {
    //console.log({beforeOpen: args})
  }

  const sidebar = useRef(null)
  const treeView = useRef(null)
  const contextMenu = useRef(null)

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
                  <div id='tree'>
                    <TreeViewComponent id='main-treeview' ref={treeView} fields={fields} nodeClicked={nodeClicked}/>
                    <ContextMenuComponent id="contentmenutree" target='#tree' items={menuItems} beforeOpen={beforeOpen}
                                          select={menuClick} ref={contextMenu}/>
                  </div>
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

