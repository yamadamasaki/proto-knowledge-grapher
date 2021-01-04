import React from 'react'
import {registerComponent, withCurrentUser} from 'meteor/vulcan:core'
import Users from 'meteor/vulcan:users'

const toArray = permission => !permission ? [] : (!Array.isArray(permission) ? [permission] : permission)
const isMemberOf = (user, permission) => Users.isMemberOf(user, permission)
const isOneOf = (user, permission) => permission.some(it => it.email === user.email)

const IfIHave = ({permission, children, currentUser}) => {
  const permissionArray = toArray(permission)
  console.log({permissionArray})
  return (
      isMemberOf(currentUser, permissionArray) || isOneOf(currentUser, permissionArray) ?
      <div>
        {children}
      </div> : <div/>
  )
}

registerComponent({name: 'IfIHave', component: IfIHave, hocs:[withCurrentUser]})
