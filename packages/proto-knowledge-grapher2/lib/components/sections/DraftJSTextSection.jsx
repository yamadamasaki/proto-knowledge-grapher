import React, {useEffect, useRef} from 'react'
import {registerComponent} from 'meteor/vulcan:core'
import SunEditor, {buttonList} from 'suneditor-react'
import plugins from 'suneditor/src/plugins'

console.log({plugins, buttonList: buttonList.complex})

const DraftJSTextSection = () => {
  const editor = useRef()
  console.log('editor', editor/*.current/*.editor.core*/)

  return (
      <React.Fragment>
        <p>DraftJSTextSection</p>
        <SunEditor height={400} ref={editor} setOptions={{buttonList: buttonList.complex,}}/>
      </React.Fragment>
  )
}

registerComponent({name: 'DraftJSTextSection', component: DraftJSTextSection})
