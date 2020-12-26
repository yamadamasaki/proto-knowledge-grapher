import {Accounts} from 'meteor/accounts-base'
import Users from 'meteor/vulcan:users'

Accounts.config({
  forbidClientAccountCreation: Users.find().fetch().length > 0,
})
