import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for KGChats.
 * @namespace KGChats
 */
export const KGChats = createCollection({
  collectionName: 'KGChats',

  typeName: 'KGChat',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
})

export default KGChats
