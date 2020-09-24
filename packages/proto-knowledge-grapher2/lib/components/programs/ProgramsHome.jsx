import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import Programs from '../../modules/programs/collection'
import {Link} from 'react-router-dom'

const LinkedTitle = ({document}) => (
    <Link to={`/programs/${document._id}`}>{document.title}</Link>
)

const ProgramsHome = () => (
    <div>
      <h1>Programs</h1>
      <Components.Datatable collection={Programs} columns={[
        {name: 'title', component: LinkedTitle},
        'structure',
      ]}/>
    </div>
)

registerComponent({name: 'ProgramsHome', component: ProgramsHome})
