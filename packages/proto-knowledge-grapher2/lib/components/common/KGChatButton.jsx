import React, {useCallback, useState} from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'
import {DialogComponent} from '@syncfusion/ej2-react-popups'

const commentIcon = `
  .e-comment-icon:before {
    content:'\\e680';
  }
`

const KGChatButton = ({match, sectionName}) => {
  const [visible, isVisible] = useState(false)
  const openDialog = useCallback(() => (isVisible(true)), [])
  const closeDialog = useCallback(() => (isVisible(false)), [])

  return (
      <React.Fragment>
        <DialogComponent width='500px' visible={visible} close={closeDialog}
                         header='Chat' allowDragging={true} showCloseIcon={true}
                         enableResize={true} resizeHandles={['All']}>
          <Components.KGChatSection match={match}/>
        </DialogComponent>
        <style>{commentIcon}></style>
        <ButtonComponent onClick={openDialog} iconCss='e-icons e-comment-icon'>Comments</ButtonComponent>
      </React.Fragment>
  )
}

registerComponent({name: 'KGChatButton', component: KGChatButton})
