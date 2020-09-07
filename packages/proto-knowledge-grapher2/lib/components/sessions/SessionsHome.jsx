import React from 'react'
import {registerComponent} from 'meteor/vulcan:core'

const SessionsHome = () => (
    <h1>Foo</h1>
)

registerComponent({name: 'SessionsHome', component: SessionsHome})
