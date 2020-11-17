import React, {useEffect} from 'react'
import {
  DiagramComponent,
  DiagramTools,
  Inject,
  PortConstraints,
  PortVisibility,
  SnapConstraints,
  Snapping,
  UndoRedo,
} from '@syncfusion/ej2-react-diagrams'
import {CheckBoxComponent} from '@syncfusion/ej2-react-buttons'
import {ItemDirective, ItemsDirective, ToolbarComponent} from '@syncfusion/ej2-react-navigations'
import {registerComponent} from 'meteor/vulcan:lib'

const interval = [
  1,
  9,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
]
const gridlines = {
  lineColor: '#e0e0e0',
  lineIntervals: interval,
}
const snapSettings = {
  snapObjectDistance: 5,
  constraints: SnapConstraints.SnapToObject | SnapConstraints.SnapToLines | SnapConstraints.ShowLines,
  horizontalGridlines: gridlines,
  verticalGridlines: gridlines,
}
const SAMPLE_CSS = `.image-pattern-style {
        background-color: white;
        background-size: contain;
        background-repeat: no-repeat;
        height: 45px;
        width: calc((100% - 12px) / 3);
        cursor: pointer;
        border: 1px solid #D5D5D5;
        background-position: center;
        float: left;
    }

    .image-pattern-style:hover {
        border-color: gray;
        border-width: 2px;
    }

    .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .row-header {
        font-size: 12px;
        font-weight: 500;
    }

    .e-checkbox-wrapper .e-label {
        font-size: 12px;
    }

    .property-panel-header {
        padding-top: 15px;
        padding-bottom: 5px
    }

    .e-selected-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .control-section {
        padding-top: 0px;
        padding-bottom: 0px;
        padding-right: 0px;
    }

    .container-fluid {
        padding-left: 0px;
    }

    .diagram-control-pane .col-xs-6 {
        padding-left: 0px;
        padding-right: 0px;
    }`

const SimpleDiagramSection = () => {
  let diagramInstance

  const onChange = args => {
    diagramInstance.tool = args.checked ? DiagramTools.ContinuousDraw : DiagramTools.DrawOnce
  }

  //Enable drawing object.
  const setDrawObject = (node, connector) => {
    const continuousDraw = document.getElementById('checked')
    if (!continuousDraw.checked) diagramInstance.tool = DiagramTools.DrawOnce
    if (connector == null) diagramInstance.drawingObject = node
    else diagramInstance.drawingObject = connector
    diagramInstance.dataBind()
  }

  //Set the Shape of the drawing Object.
  const setShape = obj => {
    const continuousDraw = document.getElementById('checked')
    if (!continuousDraw.checked) diagramInstance.tool = DiagramTools.DrawOnce
    diagramInstance.drawingObject = {shape: {type: 'Basic', shape: obj}}
    diagramInstance.dataBind()
  }

  useEffect(() => {
    setTimeout(() => renderComplete(), 0)
  })

  const renderComplete = () => {
    setShape('Rectangle')
    diagramInstance.tool = DiagramTools.ContinuousDraw
    diagramInstance.dataBind()
    //Click Event used to decide the drawing object.
    document.getElementById('appearance').onclick = (args) => {
      const target = args.target
      const selectedElement = document.getElementsByClassName('e-selected-style')
      // custom code start
      if (selectedElement.length && target.id !== '' && target.id !== 'checked')
        selectedElement[0].classList.remove('e-selected-style')
      if (!target.classList.contains('e-selected-style'))
        target.classList.add('e-selected-style')
      // custom code end
      if (target.className === 'image-pattern-style e-selected-style') {
        switch (target.id) {
          case 'shape1':
            setShape('Rectangle')
            break
          case 'shape2':
            setShape('Ellipse')
            break
          case 'shape3':
            setShape('Hexagon')
            break
          case 'shape4':
            setShape('Pentagon')
            break
          case 'shape5':
            setShape('Polygon')
            break
          case 'straight':
            setDrawObject(null, {type: 'Straight'})
            break
          case 'ortho':
            setDrawObject(null, {type: 'Orthogonal'})
            break
          case 'cubic':
            setDrawObject(null, {type: 'Bezier'})
            break
          case 'path':
            setDrawObject({
              shape: {
                type: 'Path',
                data: 'M540.3643,137.9336L546.7973,159.7016L570.3633,159.7296L550.7723,171.9366L558.9053,194.9966L540.3643,179.4996L521.8223,194.9966L529.9553,171.9366L510.3633,159.7296L533.9313,159.7016L540.3643,137.9336z',
              },
            }, null)
            target.classList.add('e-selected-style')
            break
          case 'image':
            setDrawObject({
              shape: {
                type: 'Image',
                source: '/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/employee.png',
              },
            }, null)
            break
          case 'svg':
            setDrawObject({shape: {type: 'Native', content: path}}, null)
            break
          case 'text':
            setDrawObject({shape: {type: 'Text'}}, null)
            break
          default:
            if (selectedElement.length && target.id !== '' && target.id !== 'checked')
              selectedElement[0].classList.remove('e-selected-style')
        }
      }
    }
  }

  return (
      <div className="control-pane diagram-control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="col-lg-8 control-section">
          <div className="content-wrapper" style={{width: '100%'}}>
            <DiagramComponent
                id="diagram" ref={diagram => (diagramInstance = diagram)} width={'100%'} height={'540px'}
                snapSettings={snapSettings} rulerSettings={{showRulers: true}}
                getNodeDefaults={node => {
                  const obj = node
                  const basicShape = node.shape
                  if (basicShape.shape === 'Rectangle' || basicShape.shape === 'Ellipse') obj.ports = ports
                  else if (basicShape.shape === 'Hexagon') obj.ports = hexagonPorts
                  else if (basicShape.shape === 'Pentagon') obj.ports = pentagonPorts
                  else if (basicShape.type === 'Path') obj.ports = pathPorts
                }}/>
            <Inject services={[UndoRedo, Snapping]}/>
          </div>
        </div>

        <div className="col-lg-4  property-section">
          <div className="property-panel-header">Properties</div>
          <div className="row property-panel-content" id="appearance">
            <div className="row row-header" style={{paddingTop: '10px'}}>
              Shapes
            </div>
            <div className="row" style={{paddingTop: '8px'}}>
              <img title="Rectangle" className="image-pattern-style e-selected-style" id="shape1"
                   style={{marginRight: '3px'}}
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/basicshape/DrawingTool_1.png"
                   alt="Rectangle"/>
              <img title="Ellipse" className="image-pattern-style" id="shape2" style={{margin: '0px 3px'}}
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/basicshape/DrawingTool_2.png"
                   alt="Ellipse"/>
              <img title="Hexagon" className="image-pattern-style" id="shape3"
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/basicshape/DrawingTool_3.png"
                   alt="Hexagon"/>
            </div>
            <div className="row" style={{paddingTop: '8px'}}>
              <img title="Pentagon" className="image-pattern-style" id="shape4" style={{marginRight: '3px'}}
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/basicshape/DrawingTool_4.png"
                   alt="Pentagon"/>
              <img title="Polygon" className="image-pattern-style" id="shape5" style={{margin: '0px 3px'}}
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/basicshape/DrawingTool_5.png"
                   alt="Polygon"/>
              <img title="Path" className="image-pattern-style" id="path"
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/DrawingTool_6.png"
                   alt="Path"/>
            </div>
            <div className="row" style={{paddingTop: '8px'}}>
              <img title="Image" className="image-pattern-style" id="image" style={{marginRight: '3px'}}
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/DrawingTool_7.png"
                   alt="Image"/>
              <img title="SVG" className="image-pattern-style" id="svg" style={{marginRight: '3px'}}
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/DrawingTool_8.png"
                   alt="SVG"/>
              <img title="Text" className="image-pattern-style" id="text" style={{marginRight: '3px'}}
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/DrawingTool_9.png"
                   alt="Text"/>
            </div>
            <div className="row row-header" style={{paddingTop: '10px'}}>
              Connector
            </div>
            <div className="row" style={{paddingTop: '8px'}}>
              <img className="image-pattern-style" id="straight" style={{marginRight: '3px'}}
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/connector/Connectors_1.png"
                   alt="straight"/>
              <img className="image-pattern-style" id="ortho" style={{margin: '0px 3px'}}
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/connector/Connectors_2.png"
                   alt="ortho"/>
              <img className="image-pattern-style" id="cubic"
                   src="/packages/proto-knowledge-grapher2/lib/assets/images/drawingTool/connector/Connectors_3.png"
                   alt="cubic"/>
            </div>
            <div className="row property-panel-content" style={{paddingTop: '10px'}}>
              <CheckBoxComponent id="checked" label="Continuous Draw" checked={true} change={onChange}/>
            </div>
          </div>
        </div>
        <div className="row">
          <ToolbarComponent id='toolbar'>
            <ItemsDirective>
              <ItemDirective text="Undo"/>
              <ItemDirective text="Redo"/>
              <ItemDirective type="Separator"/>
              <ItemDirective text="Save"/>
              <ItemDirective type="Separator"/>
              <ItemDirective text="Remove the Node"/>
            </ItemsDirective>
          </ToolbarComponent>
        </div>
      </div>)
}

const path =
    `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="350.000000pt" 
    height="229.000000pt" viewBox="0 0 350.000000 229.000000" 
    preserveAspectRatio="xMidYMid meet"> <metadata>
    Created by potrace 1.11, written by Peter Selinger 2001-2013
    </metadata> <g transform="translate(0.000000,229.000000) scale(0.100000,-0.100000)"
    fill="#de6ca9" stroke="none"><path d="M0 1145 l0 -1145 1750 0 1750 0 0 1145 0 1145
    -1750 0 -1750 0 0 -1145z m1434 186 c19 -8 26 -18 26 -37 0 -24 -3 -26
    -27 -19 -16 3 -58 9 -94 12 -63 5 -67 4 -88 -23 -23 -29 -21 -60 6 -81 8
    -6 47 -19 86 -29 55 -13 80 -25 106 -51 31 -31 33 -37 29 -88 -8 -94 -69
    -133 -193 -122 -90 7 -115 20 -115 58 0 26 3 30 18 24 91 -38 168 -41 204
    -8 23 21 23 75 1 96 -10 8 -49 23 -88 33 -88 22 -135 63 -135 118 0 92 67 140
    181 131 31 -2 68 -9 83 -14z m854 -6 c38 -15 42 -21 42 -51 l0 -33 -47 25
    c-41 22 -58 25 -115 22 -58 -3 -72 -8 -97 -32 -79 -75 -59 -259 32 -297 35
    -15 106 -18 150 -6 26 7 27 10 27 67 l0 60 -50 0 c-47 0 -50 2 -50 25 0 25
    1 25 80 25 l81 0 -3 -97 -3 -98 -40 -20 c-22 -10 -65 -21 -95 -23 -153 -11
    -242 74 -243 230 0 145 93 235 233 224 30 -2 74 -12 98 -21z m-638 -169 l67
    -178 40 103 c22 57 53 139 69 182 28 75 29 77 62 77 19 0 32 -4 30 -9 -1 -5
    -39 -104 -83 -220 l-80 -211 -37 0 c-35 0 -37 2 -56 53 -11 28 -48 124 -81 
    211 -34 87 -61 163 -61 168 0 5 14 8 32 6 31 -3 32 -5 98 -182z" />
    </g> </svg>`

const createPort = (id, offset) => ({
  id: id,
  shape: 'Square',
  offset: offset,
  constraints: PortConstraints.Draw,
  visibility: PortVisibility.Hover,
})

const ports = [
  createPort('port1', {x: 0, y: 0.5}),
  createPort('port2', {x: 0.5, y: 1}),
  createPort('port3', {x: 1, y: 0.5}),
  createPort('port4', {x: 0.5, y: 0}),
]

const pathPorts = [
  createPort('port1', {x: 0.5, y: 0}),
  createPort('port2', {x: 0, y: 0.39}),
  createPort('port3', {x: 1, y: 0.39}),
  createPort('port4', {x: 0.2, y: 1}),
  createPort('port5', {x: 0.8, y: 1}),
]

const hexagonPorts = [
  createPort('port1', {x: 0, y: 0.5}),
  createPort('port2', {x: 0.5, y: 0}),
  createPort('port3', {x: 0.3, y: 0}),
  createPort('port4', {x: 0.7, y: 0}),
  createPort('port5', {x: 1, y: 0.5}),
  createPort('port6', {x: 0.5, y: 1}),
  createPort('port7', {x: 0.3, y: 1}),
  createPort('port8', {x: 0.7, y: 1}),
]

const pentagonPorts = [
  createPort('port1', {x: 0.5, y: 0}),
  createPort('port2', {x: 0, y: 0.4}),
  createPort('port3', {x: 1, y: 0.4}),
  createPort('port4', {x: 0.2, y: 1}),
  createPort('port5', {x: 0.85, y: 1}),
]

registerComponent({name: 'SimpleDiagramSection', component: SimpleDiagramSection})
