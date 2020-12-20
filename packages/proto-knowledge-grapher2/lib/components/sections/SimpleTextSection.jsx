import React, {useRef, useState} from 'react'
import {Components, registerComponent, useCreate2, useMulti2, useUpdate2, withCurrentUser} from 'meteor/vulcan:core'
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from '@syncfusion/ej2-react-richtexteditor'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'
import Users from 'meteor/vulcan:users'

const toArray = permission => !permission ? [] : (!Array.isArray(permission) ? [permission] : permission)
const toBoolean = (user, permission) => Users.isMemberOf(user, toArray(permission))

const boxStyle = {
  padding: '0.5em 1em',
  margin: '2em 0',
  color: '#6091d3',/*文字色*/
  background: '#FFF',
  border: 'solid 3px #6091d3',/*線*/
  borderRadius: '10px',/*角の丸み*/
}

const SimpleTextSection = ({match, currentUser}) => {
  const {params} = match
  const collectionName = params.collectionName || 'SimpleTexts'
  const {programId, sectionId, subsection} = params
  const {id} = params
  let {isEditable, isReadable} = params
  isEditable = toBoolean(currentUser, isEditable)
  isReadable = toBoolean(currentUser, isReadable)
  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]
  if (subsection) selector.push({subsection: {_eq: subsection}})
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}
  const {results, refetch} = useMulti2({
    collectionName,
    fragmentName: 'SimpleTextFragment',
    input: {filter},
    //pollInterval: 500,
  })

  if (results && results.length === 0) results[0] = {programId, sectionId, subsection}

  const [updateDocument, {loading: loading_u}] = useUpdate2({collectionName, fragmentName: 'SimpleTextFragment'})
  const [createDocument, {loading: loading_c}] = useCreate2({collectionName, fragmentName: 'SimpleTextFragment'})
  const [error, setError] = useState()

  const document = results && results[0] || {}

  const editor = useRef()

  const onClick = async () => {
    document.htmlText = editor.current.getHtml()
    try {
      document._id ?
          await updateDocument({input: {id: document._id, data: {htmlText: document.htmlText}}}) :
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
              [loading_c, loading_u].some(it => it === true) ? <Components.Loading/> :
                  <React.Fragment>
                    {
                      isEditable &&
                      <div>
                        <RichTextEditorComponent value={document.htmlText} ref={editor}>
                          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]}/>
                        </RichTextEditorComponent>
                        <ButtonComponent onClick={onClick}>Save</ButtonComponent>
                      </div>
                    }
                    {
                      isReadable &&
                      <div style={boxStyle}>
                        <div dangerouslySetInnerHTML={{__html: document.htmlText}}/>
                      </div>
                    }
                  </React.Fragment>
        }
      </React.Fragment>
  )
}

registerComponent({name: 'SimpleTextSection', component: SimpleTextSection, hocs: [withCurrentUser]})
