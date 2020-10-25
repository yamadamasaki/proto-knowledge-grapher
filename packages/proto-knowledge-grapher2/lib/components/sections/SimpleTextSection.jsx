import React, {useRef, useState} from 'react'
import {Components, registerComponent, useCreate2, useMulti2, useUpdate2} from 'meteor/vulcan:core'
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

const SimpleTextSection = ({match}) => {
  const {params} = match
  const {programId, collectionName, sectionId} = params
  const {results, refetch} = useMulti2({
    collectionName,
    fragmentName: 'SimpleTextFragment',
    input: {filter: {_and: [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]}},
    //pollInterval: 500,
  })

  if (results && results.length === 0) results[0] = {programId, sectionId}

  const [updateDocument, {loading: loading_u}] = useUpdate2({collectionName, fragmentName: 'SimpleTextFragment'})
  const [createDocument, {loading: loading_c}] = useCreate2({collectionName, fragmentName: 'SimpleTextFragment'})
  const [error, setError] = useState()

  const document = results && results[0]

  const editor = useRef()

  const onClick = async () => {
    document.htmlText = editor.current.getHtml()
    if (document._id) {
      try {
        await updateDocument({input: {id: document._id, data: {htmlText: document.htmlText}}})
        refetch()
      } catch (e) {
        setError(e)
      }
    } else {
      try {
        await createDocument({input: {data: document}})
        refetch()
      } catch (e) {
        setError(e)
      }
    }
  }

  return (
      <React.Fragment>
        {
          error ? <Components.Flash message={error}/> :
              loading_c || loading_u ? <Components.Loading/> :
                  document ?
                      <React.Fragment>
                        <h1>SimpleTextSection</h1>
                        <RichTextEditorComponent value={document.htmlText} ref={editor}>
                          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]}/>
                        </RichTextEditorComponent>
                        <ButtonComponent onClick={onClick}>Save</ButtonComponent>
                      </React.Fragment> :
                      <Components.Flash message='Empty Document'/>
        }
      </React.Fragment>
  )
}

registerComponent({name: 'SimpleTextSection', component: SimpleTextSection})
