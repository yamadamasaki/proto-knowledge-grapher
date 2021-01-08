import React, {useCallback, useState} from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'
import {DialogComponent} from '@syncfusion/ej2-react-popups'

const headerStyle = {
  padding: '1rem 2rem',
  borderLeft: '6px double #000',
}

const KGSectionHeader = ({sectionName}) => {
  const [visible, isVisible] = useState(false)
  const openDialog = useCallback(() => (isVisible(true)), [])
  const closeDialog = useCallback(() => (isVisible(false)), [])

  return (
      <React.Fragment>
        <h2 id={sectionName} style={headerStyle}>{sectionName}</h2>
        <DialogComponent width='250px' visible={visible} close={closeDialog}
                         header='Chat' allowDragging={true} showCloseIcon={true}
                         enableResize={true} resizeHandles={['All']}>
          <Components.SimpleChatSection/>
        </DialogComponent>
        <ButtonComponent onClick={openDialog}>Chat</ButtonComponent>
      </React.Fragment>
  )
}

registerComponent({name: 'KGSectionHeader', component: KGSectionHeader})
