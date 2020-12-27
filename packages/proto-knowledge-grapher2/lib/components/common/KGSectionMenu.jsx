import React from 'react'
import {registerComponent} from 'meteor/vulcan:core'

const boxStyle = {
  margin: '10px 10px 10px 10px',
  border: '1px solid #afadad',
  borderRadius: '5px',
  padding: '5px',
}

const KGSectionMenu = ({sectionNames}) => (
    <div style={boxStyle}>
      <ol>
        {sectionNames.map((sectionName, index) => (<li key={index}><a href={`#${sectionName}`}>{sectionName}</a></li>))}
      </ol>
    </div>
)

registerComponent({name: 'KGSectionMenu', component: KGSectionMenu})
