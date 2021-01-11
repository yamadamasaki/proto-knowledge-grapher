import React from 'react'
import {registerComponent} from 'meteor/vulcan:core'

const headerStyle = {
  padding: '1rem 2rem',
  borderLeft: '6px double #000',
}

const KGSectionHeader = ({sectionName}) => (
    <h2 id={sectionName} style={headerStyle}>{sectionName}</h2>
)

registerComponent({name: 'KGSectionHeader', component: KGSectionHeader})
