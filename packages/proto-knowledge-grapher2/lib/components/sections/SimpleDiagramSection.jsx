import React from 'react'
import {registerComponent} from 'meteor/vulcan:lib'
import {
  DiagramComponent,
  HierarchicalTree,
  MindMap,
  RadialTree,
  ComplexHierarchicalTree,
  DataBinding,
  Snapping,
  PrintAndExport,
  BpmnDiagrams,
  SymmetricLayout,
  ConnectorBridging,
  UndoRedo,
  LayoutAnimation,
  DiagramContextMenu,
  ConnectorEditing
} from "@syncfusion/ej2-react-diagrams"

const SimpleDiagramSection = ({match}) => {
  const nodes = [
    {
      id: "node1",
      height: 100,
      width: 100,
      offsetX: 100,
      offsetY: 200
    }
  ]

  return (
      <React.Fragment>
        <h1>SimpleDiagramSection</h1>
        <DiagramComponent id="diagram" width={"100%"} height={"350px"} nodes={nodes}/>
      </React.Fragment>
  )
}

registerComponent({name: 'SimpleDiagramSection', component: SimpleDiagramSection})
