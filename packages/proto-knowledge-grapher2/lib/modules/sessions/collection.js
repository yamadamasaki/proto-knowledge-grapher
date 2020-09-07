import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for Sessions.
 * @namespace Sessions
 */
export const Sessions = createCollection({
  collectionName: 'Sessions',

  typeName: 'Session',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
})

export default Sessions
