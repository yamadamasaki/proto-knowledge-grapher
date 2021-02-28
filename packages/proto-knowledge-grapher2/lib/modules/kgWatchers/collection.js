import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for KGWatchers.
 * @namespace KGWatchers
 */
export const KGWatchers = createCollection({
  collectionName: 'KGWatchers',

  typeName: 'KGWatcher',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
    canDelete: ['members'],
  },
})

export default KGWatchers
