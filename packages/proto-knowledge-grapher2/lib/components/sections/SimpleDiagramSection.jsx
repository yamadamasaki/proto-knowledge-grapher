import React, {useEffect, useRef} from 'react'
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
import {ButtonComponent, CheckBoxComponent} from '@syncfusion/ej2-react-buttons'
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

    .my-row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .my-row-header {
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
  const diagram = useRef()

  const onChange = args => {
    diagram.current.tool = args.checked ? DiagramTools.ContinuousDraw : DiagramTools.DrawOnce
  }

  //Enable drawing object.
  const setDrawObject = (node, connector) => {
    const continuousDraw = document.getElementById('checked')
    if (!continuousDraw.checked) diagram.current.tool = DiagramTools.DrawOnce
    if (connector == null) diagram.current.drawingObject = node
    else diagram.current.drawingObject = connector
  }

  //Set the Shape of the drawing Object.
  const setShape = obj => {
    const continuousDraw = document.getElementById('checked')
    if (!continuousDraw.checked) diagram.current.tool = DiagramTools.DrawOnce
    diagram.current.drawingObject = {shape: {type: 'Basic', shape: obj}}
  }

  useEffect(() => {
    setTimeout(() => renderComplete(), 0)
  })

  const renderComplete = () => {
    setShape('Rectangle')
    diagram.current.tool = DiagramTools.ContinuousDraw
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
      <div className="container control-pane diagram-control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="row">
        <div className="col-lg-8 control-section">
          <div className="content-wrapper" style={{width: '100%'}}>
            <DiagramComponent
                id="diagram" ref={diagram} width={'100%'} height={'540px'}
                snapSettings={snapSettings} rulerSettings={{showRulers: true}}
                getNodeDefaults={node => {
                  const obj = node
                  const basicShape = node.shape
                  if (basicShape.shape === 'Rectangle' || basicShape.shape === 'Ellipse') obj.ports = ports
                  else if (basicShape.shape === 'Hexagon') obj.ports = hexagonPorts
                  else if (basicShape.shape === 'Pentagon') obj.ports = pentagonPorts
                  else if (basicShape.type === 'Path') obj.ports = pathPorts
                }}>
              <Inject services={[UndoRedo, Snapping]}/>
            </DiagramComponent>
          </div>
        </div>

        <div className="col-lg-4  property-section">
          <div className="property-panel-header">Properties</div>
          <div className="my-row property-panel-content" id="appearance">
            <div className="my-row my-row-header" style={{paddingTop: '10px'}}>
              Shapes
            </div>
            <div className="my-row" style={{paddingTop: '8px'}}>
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
            <div className="my-row" style={{paddingTop: '8px'}}>
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
            <div className="my-row" style={{paddingTop: '8px'}}>
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
            <div className="my-row my-row-header" style={{paddingTop: '10px'}}>
              Connector
            </div>
            <div className="my-row" style={{paddingTop: '8px'}}>
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
            <div className="my-row property-panel-content" style={{paddingTop: '10px'}}>
              <CheckBoxComponent id="checked" label="Continuous Draw" checked={false} change={onChange}/>
            </div>
          </div>
        </div>
        </div>
        <div className="row">
          <ToolbarComponent id='toolbar'>
            <ItemsDirective>
              <ItemDirective template={() => (<ButtonComponent onClick={() => diagram.current.undo()} cssClass='e-link'>undo</ButtonComponent>)}/>
              <ItemDirective template={() => (<ButtonComponent onClick={() => diagram.current.redo()} cssClass='e-link'>redo</ButtonComponent>)}/>
              <ItemDirective type="Separator"/>
              <ItemDirective template={() => (<ButtonComponent onClick={() => console.log("Undo")} cssClass='e-link'>save</ButtonComponent>)}/>
              <ItemDirective type="Separator"/>
              <ItemDirective template={() => (<ButtonComponent onClick={() => console.log("Undo")} cssClass='e-link'>Remove the Node</ButtonComponent>)}/>
            </ItemsDirective>
          </ToolbarComponent>
        </div>
      </div>
  )
}

const path =
    `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="350.000000pt" height="229.000000pt" viewBox="0 0 350.000000 229.000000" preserveAspectRatio="xMidYMid meet">
        <metadata>Created by potrace 1.11, written by Peter Selinger 2001-2013</metadata>
        <g transform="translate(0.000000,229.000000) scale(0.100000,-0.100000)" fill="#de6ca9" stroke="none">
        <path fill="none" stroke="red" d="M 10,30
            A 20,20 0,0,1 50,30
            A 20,20 0,0,1 90,30
            Q 90,60 50,90
            Q 10,60 10,30 z"/>
        </g>
    </svg>`

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
