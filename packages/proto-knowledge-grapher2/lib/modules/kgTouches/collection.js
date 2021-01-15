import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for KGTouches.
 * @namespace KGTouches
 */
export const KGTouches = createCollection({
  collectionName: 'KGTouches',

  typeName: 'KGTouch',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
})

export default KGTouches
