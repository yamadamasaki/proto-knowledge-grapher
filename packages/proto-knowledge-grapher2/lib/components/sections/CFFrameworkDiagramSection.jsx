import React from 'react'
import {registerComponent, Components} from 'meteor/vulcan:lib'

const CFFrameworkDiagramSection = ({match}) => {
  return (
      <React.Fragment>
        <h2>CFFrameworkDiagramSection</h2>
      </React.Fragment>
  )
}

registerComponent({name: 'CFFrameworkDiagramSection', component: CFFrameworkDiagramSection})
