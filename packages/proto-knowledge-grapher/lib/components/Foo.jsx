import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'

console.log("Components", Components)

const Foo = () => {
  return (
      <div>
        <h1>FOO</h1>
        <Components.AccountsLoginForm/>
      </div>
  )
}

registerComponent({
  name: 'Foo',
  component: Foo,
})
