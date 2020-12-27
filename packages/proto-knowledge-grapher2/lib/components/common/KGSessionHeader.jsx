import React from 'react'
import {registerComponent} from 'meteor/vulcan:core'

const headerStyle = {
  padding: '1rem 2rem',
  background: '#f4f4f4',
}

const KGSessionHeader = ({sessionName}) => (
    <h1 style={headerStyle}>{sessionName}</h1>
)

registerComponent({name: 'KGSessionHeader', component: KGSessionHeader})

