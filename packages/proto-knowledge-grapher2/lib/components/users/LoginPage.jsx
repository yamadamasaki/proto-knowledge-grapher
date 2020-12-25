import React from 'react'
import {Components, registerComponent} from 'meteor/vulcan:core'

const LoginPage = () => <Components.AccountsLoginForm/>

registerComponent({name: 'LoginPage', component: LoginPage,})
