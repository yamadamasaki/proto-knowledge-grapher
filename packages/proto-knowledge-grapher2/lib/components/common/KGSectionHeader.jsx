import React from 'react'
import {registerComponent} from 'meteor/vulcan:core'

const headerStyle = {
  padding: '1rem 2rem',
  borderLeft: '6px double #000',
  background: '#f4f4f4',
  margin: '1rem 0rem'
}

const KGSectionHeader = ({sectionName}) => (
    <h2 id={sectionName} style={headerStyle}>{sectionName}</h2>
)

registerComponent({name: 'KGSectionHeader', component: KGSectionHeader})
