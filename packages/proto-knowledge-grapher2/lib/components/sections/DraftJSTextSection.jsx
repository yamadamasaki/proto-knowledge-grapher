import React, {useRef, useState} from 'react'
import {Components, registerComponent, useCreate2, useMulti2, useUpdate2} from 'meteor/vulcan:core'
import SunEditor, {buttonList} from 'suneditor-react'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'

const boxStyle = {
  padding: '0.5em 1em',
  margin: '2em 0',
  //color: '#6091d3',/*文字色*/
  background: '#FFF',
  border: 'solid 3px #6091d3',/*線*/
  borderRadius: '10px',/*角の丸み*/
}

const DraftJSTextSection = ({match}) => {
  const {params} = match
  const collectionName = params.collectionName || 'SimpleTexts'
  const {programId, sectionId, subsection} = params
  const {id} = params
  const {isEditable, isReadable} = params

  if ((!isEditable || !isEditable.length) && (!isReadable || isReadable.length)) return <div/>

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

  const onClick = async () => { // ToDo
    document.htmlText = editor.current.editor.core.getContents(true) // ToDo
    try {
      document._id ?
          await updateDocument({input: {id: document._id, data: {htmlText: document.htmlText}}}) :
          await createDocument({input: {data: document}})
      refetch()
    } catch (e) {
      setError(e)
    }
  }

  if (error) return <Components.Flash message={error}/>
  if ([loading_c, loading_u].some(it => it === true)) return <Components.Loading/>

  if (editor && editor.current && document) editor.current.editor.core.setContents(document.htmlText)

  return (
      <React.Fragment>
        <Components.IfIHave permission={isEditable}>
          <SunEditor height={400} ref={editor} setOptions={{buttonList: buttonList.complex}}/>
          <ButtonComponent onClick={onClick}>Save</ButtonComponent>
        </Components.IfIHave>
        <Components.IfIHave permission={isReadable}>
          <div style={boxStyle} dangerouslySetInnerHTML={{__html: document.htmlText}}/>
        </Components.IfIHave>
      </React.Fragment>
  )
}

registerComponent({name: 'DraftJSTextSection', component: DraftJSTextSection})
