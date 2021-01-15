import React, {useCallback, useState} from 'react'
import {Components, registerComponent, useCreate2, useMulti2, useUpdate2, withCurrentUser} from 'meteor/vulcan:core'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'
import {DialogComponent} from '@syncfusion/ej2-react-popups'

const style = `
  .e-comment-icon:before {
    content:'\\e680';
  }
  .e-close-icon:before {
    content:'\\e7fc';
  }
  .e-right { margin:0 0 0 auto; }
`

const KGChatButton = ({match, currentUser}) => {
  const {
    programId, sectionId, subsection, collectionName = 'KGTouches', fragmentName = 'KGTouchIdFragment', id,
  } = match.params

  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}, {userId: {_eq: currentUser._id}}]
  if (subsection) selector.push({subsection: {_eq: subsection}})
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}

  const {results, loading: loading_log, refetch} = useMulti2(
      {collectionName, fragmentName, input: {filter}, pollInterval: 0})
  if (results && results.length === 0) results[0] = {programId, sectionId, subsection}
  const [updateDocument, {loading: loading_update}] = useUpdate2({collectionName, fragmentName})
  const [createDocument, {loading: loading_create}] = useCreate2({collectionName, fragmentName})

  const {results: chat, loading: loading_chat} = useMulti2(
      {collectionName: 'KGChats', fragmentName: 'KGChatUpdatedAtFragment', input: {filter}, pollInterval: 0},
  )
  const updatedAt = chat && chat.length > 0 && chat[0] && chat[0].updatedAt

  const [error, setError] = useState()

  const document = results && results[0] || {programId, sectionId, subsection}

  const [visible, isVisible] = useState(false)

  const openDialog = useCallback(() => (isVisible(true)), [])
  const closeDialog = useCallback(() => {isVisible(false)}, [])

  const touch = () => {
    document.lastAccessedAt = new Date().toISOString()
    try {
      document._id ?
          updateDocument({input: {id: document._id, data: {lastAccessedAt: document.lastAccessedAt}}}) :
          createDocument({input: {data: document}})
      refetch()
    } catch (e) {
      setError(e)
    }
  }

  return (
      error ? <Components.Flash message={error}/> :
          [loading_update, loading_create, loading_log].some(it => it === true) ? <Components.Loading/> :
              <React.Fragment>
                <style>{style}</style>
                <DialogComponent width='500px' visible={visible} header='Comments' allowDragging={true}>
                  <ButtonComponent iconCss='e-icons e-close-icon' onClick={() => {
                    touch()
                    closeDialog()
                  }}/>
                  <Components.KGChatSection match={match}/>
                </DialogComponent>
                <span>
                  <ButtonComponent onClick={openDialog} iconCss='e-icons e-comment-icon'>Comments</ButtonComponent>
                  {
                    updatedAt > document.lastAccessedAt ? <span className='e-badge e-badge-primary'>New</span> : <span/>
                  }
                </span>
              </React.Fragment>
  )
}

registerComponent({name: 'KGChatButton', component: KGChatButton, hocs: [withCurrentUser]})
