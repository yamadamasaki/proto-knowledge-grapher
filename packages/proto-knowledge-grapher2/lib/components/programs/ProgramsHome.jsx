import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import Programs from '../../modules/programs/collection'

const ProgramsHome = () => (
    <div>
      <h1>Programs</h1>
      <Components.Datatable collection={Programs}/>
    </div>
)

registerComponent({name: 'ProgramsHome', component: ProgramsHome})
