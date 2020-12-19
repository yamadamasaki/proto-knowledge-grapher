import React from 'react'
import PropTypes from 'prop-types'
import {Components, getSetting, registerComponent, withCurrentUser, withMessages} from 'meteor/vulcan:core'
import {FormattedMessage} from 'meteor/vulcan:i18n'
import {withRouter} from 'react-router-dom'

const logoUrl = getSetting('logoUrl')
const siteTitle = getSetting('title', 'My App')
const tagline = getSetting('tagline')

const NewPostButton = () => (
    <Components.Button className="posts-new-button" variant="primary">
      <Components.Icon name="new"/> <FormattedMessage id="posts.new_post"/>
    </Components.Button>
)

const Header = ({currentUser, flash, history}) => {
  return (
      <div className="header-wrapper">
        <header className="header">
          <div className="logo">
            <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle}/>
            {tagline ? <h2 className="tagline">{tagline}</h2> : ''}
          </div>

          <div className="nav">
            <div className="nav-user">
              <Components.UsersMenu/>
            </div>
          </div>
        </header>
      </div>
  )
}

Header.displayName = 'Header'

Header.propTypes = {
  currentUser: PropTypes.object,
}

registerComponent({name: 'Header', component: Header, hocs: [withCurrentUser, withMessages, withRouter]})
