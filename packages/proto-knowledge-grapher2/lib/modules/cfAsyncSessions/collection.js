import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for CFAsyncSessions.
 * @namespace CFAsyncSessions
 */
export const CFAsyncSessions = createCollection({
  collectionName: 'CFAsyncSessions',

  typeName: 'CFAsyncSession',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
})

export default CFAsyncSessions
