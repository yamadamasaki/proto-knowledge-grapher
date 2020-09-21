import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import Sections from '../../modules/sections/collection'

const SectionsHome = () => (
    <div>
      <h1>Sections</h1>
      <Components.Datatable collection={Sections}/>
    </div>
)

registerComponent({name: 'SectionsHome', component: SectionsHome})
