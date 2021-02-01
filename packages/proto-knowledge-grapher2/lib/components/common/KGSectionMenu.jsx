import React from 'react'
import {registerComponent} from 'meteor/vulcan:core'
import {Link} from 'react-router-dom'

const boxStyle = {
  margin: '10px 10px 10px 10px',
  border: '1px solid #afadad',
  borderRadius: '5px',
  padding: '5px',
}

const KGSectionMenu = ({sectionNames, sections}) => (
    <div>
      {
        sections ? (
            <div style={boxStyle}>
              <ol>
                {
                  sections.map((section, index) => {
                    const {name, programId, sectionId, subsection, componentName} = section
                    return (
                        <li key={index}>
                          <Link to={`/sections/${programId}/${sectionId}/${subsection}/${componentName}`}>
                            {name}
                          </Link>
                        </li>
                    )
                  })
                }
              </ol>
            </div>
        ) : <div/>
      }
      {
        sectionNames ? (
            <div style={boxStyle}>
              <ol>
                {
                  sectionNames.map(
                      (sectionName, index) => (<li key={index}><a href={`#${sectionName}`}>{sectionName}</a></li>)
                  )
                }
              </ol>
            </div>
        ) : <div/>
      }
    </div>
)

registerComponent({name: 'KGSectionMenu', component: KGSectionMenu})
