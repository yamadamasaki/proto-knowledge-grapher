import React, {useRef, useState} from 'react'
import {Components, registerComponent, useCreate2, useMulti2, useUpdate2, withCurrentUser} from 'meteor/vulcan:core'
import Users from 'meteor/vulcan:users'
import {TextBoxComponent} from '@syncfusion/ej2-react-inputs'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'

const toArray = permission => !permission ? [] : (!Array.isArray(permission) ? [permission] : permission)
const toBoolean = (user, permission) => Users.isMemberOf(user, toArray(permission))

const GoogleFormsSection = ({match, currentUser}) => {
  const {params} = match
  const collectionName = params.collectionName || 'GoogleForms'
  const {programId, sectionId, subsection} = params
  const {id} = params
  let {isDefinable, isAnswerable} = params
  isDefinable = toBoolean(currentUser, isDefinable)
  isAnswerable = toBoolean(currentUser, isAnswerable)

  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]
  if (subsection) selector.push({subsection: {_eq: subsection}})
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}
  const {results, refetch, loading: loading_q} = useMulti2({
    collectionName,
    fragmentName: 'GoogleFormFragment',
    input: {filter},
    //pollInterval: 500,
  })

  if (results && results.length === 0) results[0] = {programId, sectionId, subsection}

  const [updateDocument, {loading: loading_u}] = useUpdate2({collectionName, fragmentName: 'GoogleFormFragment'})
  const [createDocument, {loading: loading_c}] = useCreate2({collectionName, fragmentName: 'GoogleFormFragment'})
  const [error, setError] = useState()

  const document = results && results[0] || {}

  const formUrl = useRef()
  const resultUrl = useRef()

  const save = async () => {
    document.formUrl = formUrl.current.value
    document.resultUrl = resultUrl.current.value
    try {
      document._id ?
          await updateDocument(
              {input: {id: document._id, data: {formUrl: document.formUrl, resultUrl: document.resultUrl}}}) :
          await createDocument({input: {data: document}})
      refetch()
    } catch (e) {
      setError(e)
    }
  }

  return (
      <React.Fragment>
        {
          error ? <Components.Flash message={error}/> :
              [loading_c, loading_u, loading_q].some(it => it === true) ? <Components.Loading/> :
                  <React.Fragment>
                    {
                      isDefinable &&
                      <div>
                        <h3>Google Forms URL</h3>
                        <TextBoxComponent placeholder="Google Forms URL" value={document && document.formUrl}
                                          floatLabelType="Auto" ref={formUrl}/>
                        <TextBoxComponent placeholder="Result URL" value={document && document.resultUrl}
                                          floatLabelType="Auto" ref={resultUrl}/>
                        <ButtonComponent onClick={save}>Save</ButtonComponent>
                        <br/>
                        <a href={document.resultUrl}>結果表示（要Google Driveアカウント）</a>
                      </div>
                    }
                    {
                      isAnswerable &&
                      <div>
                        <h3>質問</h3>
                        <iframe src={document.formUrl} width="640" height="2078" frameBorder="0" marginHeight="0"
                                marginWidth="0">読み込んでいます…
                        </iframe>
                      </div>
                    }
                  </React.Fragment>
        }
      </React.Fragment>
  )
}

registerComponent({name: 'GoogleFormsSection', component: GoogleFormsSection, hocs: [withCurrentUser]})
