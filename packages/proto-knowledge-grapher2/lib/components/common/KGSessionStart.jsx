import React, {useState} from 'react'
import {Components, registerComponent, useCreate2} from 'meteor/vulcan:core'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'
import {findSingleDocument} from '../utils/documents'

const collectionName = 'KGSessionSpecs'
const fragmentName = 'KGSessionSpecsFragment'

const KGSessionStart = ({programId, sectionId, spec, children}) => {
  const loadings = {}
  const [error, setError] = useState()

  const {document, refetch, loading: l_document, error: e_document} = findSingleDocument({
    programId, sectionId, collectionName, fragmentName, pollInterval: 0,
  })
  if (l_document) loadings.document = l_document
  if (e_document) setError(e_document)

  const [createDocument, {loading: l_create, error: e_create}] = useCreate2({
    collectionName, fragmentName,
  })
  if (l_create) loadings.create = l_create
  if (e_create) setError(e_create)

  const startSession = async () => {
    if (!document) return
    document.specs = spec
    try {
      await createDocument({input: {data: document}})
      refetch()
    } catch (e) {
      setError(e)
    }
  }

  return (
      error ? <Components.Flash message={error}/> :
          Object.values(loadings).some(it => !!it) ? <Components.Loading/> :
              <React.Fragment>
                <div>
                  {
                    document && !document._id ?
                        <ButtonComponent onClick={startSession}>Start the Session</ButtonComponent> :
                        children
                  }
                  <br/>
                </div>
              </React.Fragment>
  )
}

registerComponent({name: 'KGSessionStart', component: KGSessionStart})
