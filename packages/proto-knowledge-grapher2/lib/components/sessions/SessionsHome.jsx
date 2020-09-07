import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import Sessions from '../../modules/sessions/collection'

const SessionsHome = () => (
    <div>
    <h1>Sessions</h1>
      <Components.Datatable collection={Sessions}/>
    </div>
)

registerComponent({name: 'SessionsHome', component: SessionsHome})
