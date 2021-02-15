import React, {useState} from 'react'
import {Components, registerComponent, useCreate2} from 'meteor/vulcan:core'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'
import {findSingleDocument} from '../utils/documents'

const collectionName = 'KGSessionSpecs'
const fragmentName = 'KGSessionSpecsFragment'

const KGSessionStart = ({programId, sectionId, spec, isStartable, children}) => {
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

  if (error) return <Components.Flash message={error}/>
  if (Object.values(loadings).some(it => !!it)) return <Components.Loading/>

  return (
      <React.Fragment>
          {
            document && !document._id ?
                <Components.IfIHave permission={isStartable}>
                  <ButtonComponent onClick={startSession}>Start the Session</ButtonComponent>
                </Components.IfIHave> :
                children
          }
          <br/>
      </React.Fragment>
  )
}

registerComponent({name: 'KGSessionStart', component: KGSessionStart})
