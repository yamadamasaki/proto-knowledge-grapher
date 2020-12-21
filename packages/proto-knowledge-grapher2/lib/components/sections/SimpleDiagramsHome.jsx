import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import SimpleDiagrams from '../../modules/simpleDiagrams/collection'
import {Link} from 'react-router-dom'

const LinkedTitle = ({document}) => (
    <Link to={`/simpleDiagrams/${document._id}`}>{document.title || document._id}</Link>
)

const SimpleDiagramsHome = () => (
    <React.Fragment>
      <h1>Simple Diagrams</h1>
      <Components.Datatable
          collection={SimpleDiagrams}
          columns={[
            {name: 'title', component: LinkedTitle},
            {name: 'programId', label: 'programId'},
            {name: 'sectionId', label: 'sectionId'},
            {name: 'createdAt', label: 'createdAt'},
          ]}
          options={{fragmentName: 'SimpleDiagramAllFragment'}}
          showNew={false}
          showEdit={false}
      />
    </React.Fragment>
)

registerComponent({name: 'SimpleDiagramsHome', component: SimpleDiagramsHome})
