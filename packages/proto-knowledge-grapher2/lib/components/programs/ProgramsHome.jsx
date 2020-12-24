import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import Programs from '../../modules/programs/collection'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet'

const LinkedTitle = ({document}) => (
    <Link to={`/programs/${document._id}`}>{document.title}</Link>
)

const ProgramsHome = () => (
    <React.Fragment>
      <Helmet><title>KG Programs Home</title></Helmet>
      <h1>Programs</h1>
      <Components.Datatable collection={Programs} columns={[
        {name: 'title', component: LinkedTitle},
        {name: 'structureAsJson', label: 'structure'},
      ]}/>
    </React.Fragment>
)

registerComponent({name: 'ProgramsHome', component: ProgramsHome})
