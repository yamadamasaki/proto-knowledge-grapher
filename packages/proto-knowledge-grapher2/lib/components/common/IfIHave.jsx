import React from 'react'
import {registerComponent, withCurrentUser} from 'meteor/vulcan:core'
import Users from 'meteor/vulcan:users'

const isMemberOf = ({user, permission = []}) => Users.isMemberOf(user, permission)
const isOneOf = ({user, permission = []}) => permission.some(it => it === user._id)

export const isPermitted = (currentUser, permission) =>
    !permission ||
    isMemberOf({user: currentUser, permission: permission.groups}) ||
    isOneOf({user: currentUser, permission: permission.users})

const IfIHave = ({permission, children, currentUser}) =>
    isPermitted(currentUser, permission) ?
        <div>
          {children}
        </div> : <div/>

registerComponent({name: 'IfIHave', component: IfIHave, hocs: [withCurrentUser]})
