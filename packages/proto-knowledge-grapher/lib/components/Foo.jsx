import React from 'react'
import {registerComponent} from 'meteor/vulcan:core'

const Foo = () => (
    <div>FOO</div>
)

registerComponent({
  name: 'Foo',
  component: Foo,
})
