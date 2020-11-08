import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:lib'
import SimpleTexts from '../../modules/simpleTexts/collection'
import {Link} from 'react-router-dom'

const LinkedTitle = ({document}) => (
    <Link to={`/simpleTexts/${document._id}`}>{document.title || document._id}</Link>
)

const SimpleTextsHome = () => (
    <React.Fragment>
      <h1>Simple Texts</h1>
      <Components.Datatable
          collection={SimpleTexts}
          columns={[
            {name: 'title', component: LinkedTitle},
            {name: 'programId', label: 'programId'},
            {name: 'sectionId', label: 'sectionId'},
            {name: 'htmlText', label: 'htmlText'},
            {name: 'createdAt', label: 'createdAt'},
          ]}
          options={{fragmentName: 'SimpleTextAllFragment'}}
          showNew={false}
          showEdit={false}
      />
    </React.Fragment>
)

registerComponent({name: 'SimpleTextsHome', component: SimpleTextsHome})
