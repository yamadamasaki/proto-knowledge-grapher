import React from 'react'
import {registerComponent} from 'meteor/vulcan:core'
import {Button, ChatList, Dropdown, Input, MeetingList, MessageList, Popup, SideBar} from 'react-chat-elements'

import {FaComments, FaSearch, FaSquare} from 'react-icons/fa'
import {MdClose, MdMenu} from 'react-icons/md'

import {loremIpsum} from 'react-lorem-ipsum'
import Identicon from 'identicon.js'

const SAMPLE_CSS = `body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, ubuntu;
    background: navajowhite;
    margin: 0;
    padding: 0;
}

html,
body {
    height: 100%;
    overflow: hidden;
}

input,
button {
    font-family: verdana, ubuntu;
}

.container {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    overflow: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.chat-list {
    min-width: 240px;
    max-width: 380px;
    overflow: auto;
}

.right-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.message-list {
    flex: 1;
    min-width: 140px;
    overflow: auto;
}

.input-area {
    height: 50px;
    background: red;
}
`

export class SimpleChatSection extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      show: true,
      list: 'chat',
      messageList: [],
    }

    this.addMessage = this.addMessage.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.addMessage(6)
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  token() {
    return (parseInt(Math.random() * 10 % 7))
  }

  photo(size) {
    return new Identicon(String(Math.random()) + String(Math.random()), {
      margin: 0,
      size: size || 20,
    }).toString()
  }

  random(type, mtype) {
    switch (type) {
      case 'message':
        mtype = mtype || this.token()
        let status = 'waiting'
        switch (mtype) {
          case 0:
            mtype = 'photo'
            status = 'sent'
            break
          case 1:
            mtype = 'file'
            status = 'sent'
            break
          case 2:
            mtype = 'system'
            status = 'received'
            break
          case 3:
            mtype = 'location'
            break
          case 4:
            mtype = 'spotify'
            break
          case 5:
            mtype = 'meeting'
            break
          case 6:
            mtype = 'video'
            status = 'sent'
            break
          default:
            mtype = 'text'
            status = 'read'
            break
        }

        return {
          position: (this.token() >= 1 ? 'right' : 'left'),
          forwarded: true,
          replyButton: true,
          reply: this.token() >= 1 ? ({
            photoURL: this.token() >= 1 ? `data:image/png;base64,${this.photo(150)}` : null,
            title: loremIpsum({avgWordsPerSentence: 2}),
            titleColor: this.getRandomColor(),
            message: loremIpsum({avgSentencesPerParagraph: 1}),
          }) : null,
          meeting: this.token() >= 1 ? ({
            subject: loremIpsum({avgWordsPerSentence: 2}),
            title: loremIpsum({avgWordsPerSentence: 2}),
            date: +new Date(),
            collapseTitle: loremIpsum({avgWordsPerSentence: 2}),
            participants: Array(this.token() + 6).fill(1).map(() => ({
              id: parseInt(Math.random() * 10 % 6),
              title: loremIpsum({avgWordsPerSentence: 1}),
            })),
            dataSource: Array(this.token() + 5).fill(1).map(() => ({
              id: String(Math.random()),
              avatar: `data:image/png;base64,${this.photo()}`,
              message: loremIpsum({avgSentencesPerParagraph: 1}),
              title: loremIpsum({avgWordsPerSentence: 2}),
              avatarFlexible: true,
              date: +new Date(),
              event: {
                title: loremIpsum({avgWordsPerSentence: 2}),
                avatars: Array(this.token() + 2).fill(1).map(x => ({
                  src: `data:image/png;base64,${this.photo()}`,
                  title: 'react, rce',
                })),
                avatarsLimit: 5,
              },
              record: {
                avatar: `data:image/png;base64,${this.photo()}`,
                title: loremIpsum({avgWordsPerSentence: 1}),
                savedBy: 'Kaydeden: ' + loremIpsum({avgWordsPerSentence: 2}),
                time: new Date().toLocaleString(),
              },
            })),
          }) : null,
          type: mtype,
          theme: 'white',
          view: 'list',
          title: loremIpsum({avgWordsPerSentence: 2}),
          titleColor: this.getRandomColor(),
          text: mtype === 'spotify' ?
              'spotify:track:0QjjaCaXE45mvhCnV3C0TA' :
              loremIpsum({avgSentencesPerParagraph: 1}),
          data: {
            videoURL: this.token() >= 1 ?
                'https://www.w3schools.com/html/mov_bbb.mp4' :
                'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4',
            uri: `data:image/png;base64,${this.photo(150)}`,
            status: {
              click: true,
              loading: 0.5,
              download: mtype === 'video',
            },
            size: '100MB',
            width: 300,
            height: 300,
            latitude: '37.773972',
            longitude: '-122.431297',
            staticURL: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-circle+FF0000(LONGITUDE,LATITUDE)/LONGITUDE,LATITUDE,ZOOM/270x200@2x?access_token=KEY',
          },
          onLoad: () => {
            console.log('Photo loaded')
          },
          status: status,
          date: +new Date(),
          onReplyMessageClick: () => {
            console.log('onReplyMessageClick')
          },
          avatar: `data:image/png;base64,${this.photo()}`,
        }
      case 'chat':
        return {
          id: String(Math.random()),
          avatar: `data:image/png;base64,${this.photo()}`,
          avatarFlexible: true,
          statusColor: 'lightgreen',
          statusColorType: parseInt(Math.random() * 100 % 2) === 1 ? 'encircle' : undefined,
          alt: loremIpsum({avgWordsPerSentence: 2}),
          title: loremIpsum({avgWordsPerSentence: 2}),
          date: new Date(),
          subtitle: loremIpsum({avgSentencesPerParagraph: 1}),
          unread: parseInt(Math.random() * 10 % 3),
          dropdownMenu: (
              <Dropdown
                  animationPosition="norteast"
                  title='Dropdown Title'
                  buttonProps={{
                    type: 'transparent',
                    color: '#cecece',
                    icon: {
                      component: <MdMenu/>,
                      size: 24,
                    },
                  }}
                  items={[
                    {
                      icon: {
                        component: <FaSquare/>,
                        float: 'left',
                        color: 'red',
                        size: 22,
                      },
                      text: 'Menu Item',
                    },
                    {
                      icon: {
                        component: <FaSquare/>,
                        float: 'left',
                        color: 'purple',
                        size: 22,
                      },
                      text: 'Menu Item',
                    },
                    {
                      icon: {
                        component: <FaSquare/>,
                        float: 'left',
                        color: 'yellow',
                        size: 22,
                      },
                      text: 'Menu Item',
                    },
                  ]}/>
          ),
        }
      case 'meeting':
        return {
          id: String(Math.random()),
          lazyLoadingImage: `data:image/png;base64,${this.photo()}`,
          avatarFlexible: true,
          subject: loremIpsum({avgSentencesPerParagraph: 1}),
          date: new Date(),
          avatars: Array(this.token() + 2).fill(1).map(() => ({
            src: `data:image/png;base64,${this.photo()}`,
          })),
          closable: true,
        }
    }
  }

  addMessage(mtype) {
    const list = this.state.messageList
    list.push(this.random('message', mtype))
    this.setState({
      messageList: list,
    })
  }

  render() {
    const arr = []
    for (let i = 0; i < 5; i++)
      arr.push(i)

    const chatSource = arr.map(() => this.random('chat'))
    const meetingSource = arr.map(() => this.random('meeting'))

    return (
        <div className='container'>
          <style>{SAMPLE_CSS}</style>
          <div
              className='chat-list'>
            <SideBar
                top={
                  <div>
                    <Popup
                        // show={this.state.show}
                        header='Lorem ipsum dolor sit amet.'
                        headerButtons={[
                          {
                            type: 'transparent',
                            color: 'black',
                            onClick: () => {
                              this.setState({show: false})
                            },
                            icon: {
                              component: <MdClose/>,
                              size: 18,
                            },
                          }]}
                        text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem animi veniam voluptas eius!'
                        footerButtons={[
                          {
                            color: 'white',
                            backgroundColor: '#ff5e3e',
                            text: 'Vazgeç',
                          }, {
                            color: 'white',
                            backgroundColor: 'lightgreen',
                            text: 'Tamam',
                          }]}/>

                    <Button
                        type='transparent'
                        color='black'
                        text={this.state.list === 'chat' ? 'MeetingList' : 'ChatList'}
                        onClick={() => {
                          this.setState({
                            list: this.state.list === 'chat' ? 'meeting' : 'chat',
                          })
                        }}/>
                  </div>
                }
                center={
                  this.state.list === 'chat' ?
                      <ChatList
                          dataSource={chatSource}/>
                      :
                      <MeetingList
                          onMeetingClick={console.log}
                          onShareClick={console.log}
                          dataSource={meetingSource}/>
                }
                bottom={
                  <span>
                                <Button
                                    type='transparent'
                                    color='black'
                                    icon={{
                                      component: <FaComments/>,
                                      size: 18,
                                    }}/>
                                <Button
                                    type='transparent'
                                    color='black'
                                    icon={{
                                      component: <FaSearch/>,
                                      size: 18,
                                    }}/>
                                <Button text="Count"/>
                            </span>
                }/>
          </div>
          <div
              className='right-panel'>
            <MessageList
                className='message-list'
                lockable={true}
                downButtonBadge={10}
                dataSource={this.state.messageList}/>

            <Input
                placeholder="Mesajınızı buraya yazınız."
                defaultValue=""
                ref='input'
                multiline={true}
                // buttonsFloat='left'
                onKeyPress={(e) => {
                  if (e.shiftKey && e.charCode === 13) {
                    return true
                  }
                  if (e.charCode === 13) {
                    this.refs.input.clear()
                    this.addMessage()
                    e.preventDefault()
                    return false
                  }
                }}
                rightButtons={
                  <Button
                      text='Gönder'
                      onClick={() => this.addMessage()}/>
                }/>
          </div>
        </div>
    )
  }
}

registerComponent({name: 'SimpleChatSection', component: SimpleChatSection})
