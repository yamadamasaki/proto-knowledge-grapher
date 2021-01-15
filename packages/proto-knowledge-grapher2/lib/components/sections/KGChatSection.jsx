import React, {useRef, useState} from 'react'
import {Components, registerComponent, useCreate2, useMulti2, useUpdate2, withCurrentUser} from 'meteor/vulcan:core'
import {TextBoxComponent} from '@syncfusion/ej2-react-inputs'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'
import Users from 'meteor/vulcan:users'
import * as timeago from 'timeago.js'
import {removeTypename} from '../utils/removeTypename'

const CHAT_CSS = `
.line-bc {
  padding: 20px 10px;
  max-width: 450px;
  margin: 15px auto;
  text-align: right;
  font-size: 14px;
  background: #7da4cd;

}

.balloon6 {
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
}

.balloon6 .faceicon {
  float: left;
  margin-right: -50px;
  width: 40px;
}

.balloon6 .faceicon img{
  width: 100%;
  height: auto;
  border-radius: 50%;
}
.balloon6 .chatting {
  width: 100%;
  text-align: left;
}
.says {
  display: inline-block;
  position: relative; 
  margin: 0 0 0 50px;
  padding: 10px;
  max-width: 250px;
  border-radius: 12px;
  background: #edf1ee;
}

.says:after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 3px; 
  left: -19px;
  border: 8px solid transparent;
  border-right: 18px solid #edf1ee;
  -webkit-transform: rotate(35deg);
  transform: rotate(35deg);
}
.says p {
  margin: 0;
  padding: 0;
}

.mycomment {
  margin: 10px 0;
}
.mycomment p {
  display: inline-block;
  position: relative; 
  margin: 0 10px 0 0;
  padding: 8px;
  max-width: 250px;
  border-radius: 12px;
  background: #30e852;
  font-size: 15px:
}

.mycomment p:after {
  content: "";
  position: absolute;
  top: 3px; 
  right: -19px;
  border: 8px solid transparent;
  border-left: 18px solid #30e852;
  -webkit-transform: rotate(-35deg);
  transform: rotate(-35deg);
}
`

const KGChatSection = ({match, currentUser}) => {
  const {
    collectionName = 'KGChats',
    programId,
    sectionId,
    subsection,
    id,
    isChattable,
    isReadable,
  } = match.params
  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]
  if (subsection) selector.push({subsection: {_eq: subsection}})
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}
  const {results, refetch, loading: loading_chats} = useMulti2({
    collectionName,
    fragmentName: 'KGChatFullFragment',
    input: {filter},
    //pollInterval: 500,
  })
  if (results && results.length === 0) results[0] = {programId, sectionId, subsection}

  const {results: users, loading: loading_users} = useMulti2(
      {collection: Users, fragmentName: 'UsersMinimumInfo', input: {filter: {username: {_is_null: false}}}},
  )

  const [updateDocument, {loading: loading_update}] = useUpdate2({collectionName, fragmentName: 'KGChatFragment'})
  const [createDocument, {loading: loading_create}] = useCreate2({collectionName, fragmentName: 'KGChatFragment'})
  const [error, setError] = useState()

  const document = results && results[0] || {}

  const textBox = useRef()
  const button = useRef()
  const onClick = async () => {
    const text = textBox.current.value
    if (!text) return
    if (!document.messages) document.messages = []
    document.messages.unshift({who: currentUser._id, when: new Date().toISOString(), text})
    try {
      document._id ?
          await updateDocument({input: {id: document._id, data: {messages: removeTypename(document.messages)}}}) :
          await createDocument({input: {data: document}})
    } catch (e) {
      setError(e)
    }
    refetch()
    textBox.current.value = ''
  }

  return (
      <Components.IfIHave permission={isReadable}>
        {
          error ? <Components.Flash message={error}/> :
              [loading_chats, loading_users, loading_create, loading_update].some(it => it === true) ?
                  <Components.Loading/> :
                  <React.Fragment>
                    <style>{CHAT_CSS}</style>
                    <Components.IfIHave permission={isChattable}>
                      <TextBoxComponent placeholder="Chat Text" floatLabelType="Auto" multiline={true} ref={textBox}/>
                      <ButtonComponent onClick={onClick} ref={button}>Say</ButtonComponent>
                    </Components.IfIHave>
                    <div className="line-bc">
                      {
                        document.messages &&
                        document.messages.map((message, index) => {
                          const user = users.find(user => user._id === message.who)
                          return (
                              message.who === currentUser._id ?
                                  <div key={index}>
                                    <div className="mycomment"><p>{message.text}</p></div>
                                    <div style={{fontStyle: 'italic', fontSize: 'smaller'}}>
                                      {timeago.format(message.when)}
                                    </div>
                                  </div> :
                                  <div key={index} className="balloon6">
                                    {
                                      user &&
                                      <div className="faceicon">
                                        <img src={user.avatarUrl} alt={user.username}/>
                                      </div>
                                    }
                                    <div className="chatting">
                                      <div className="says">
                                        <p>{message.text}</p>
                                      </div>
                                      <div style={{fontStyle: 'italic', fontSize: 'smaller'}}>
                                        {user && <p>{user.username}, </p>}
                                        <p>{timeago.format(message.when)}</p>
                                      </div>
                                    </div>
                                  </div>
                          )
                        })
                      }
                    </div>
                  </React.Fragment>
        }
      </Components.IfIHave>
  )
}

registerComponent({name: 'KGChatSection', component: KGChatSection, hocs: [withCurrentUser]})
