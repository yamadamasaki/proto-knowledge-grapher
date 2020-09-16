import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for Parts.
 * @namespace Parts
 */
export const Parts = createCollection({
  collectionName: 'Parts',

  typeName: 'Part',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
})

export default Parts
