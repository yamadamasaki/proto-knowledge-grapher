import React from 'react'
import {registerComponent} from 'meteor/vulcan:lib'
import {Components, useMulti2} from 'meteor/vulcan:core'
import Programs from '../../modules/programs/collection'
import {Link} from 'react-router-dom'
import {ListViewComponent} from '@syncfusion/ej2-react-lists'
import {Helmet} from 'react-helmet'

const KnowledgeGrapherHome = () => {
  const {results, loading} = useMulti2({
    collection: Programs,
    fragmentName: 'ProgramFragment',
    input: {},
    //pollInterval: 500,
  })

  const listTemplate = item => (<Link to={`/programs/${item._id}`}>{item.title}</Link>)

  return (
      <React.Fragment>
        <Helmet><title>Knowledge Grapher Home</title></Helmet>
        {
          loading ? <Components.Loading/> :
              <div>
                <h1>KnowledgeGrapher Home</h1>
                <ListViewComponent dataSource={results} template={listTemplate}></ListViewComponent>
              </div>
        }
      </React.Fragment>
  )
}

registerComponent({name: 'KnowledgeGrapherHome', component: KnowledgeGrapherHome})
