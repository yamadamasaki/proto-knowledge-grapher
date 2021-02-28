import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for KGSessionSpecs.
 * @namespace KGSessionSpecs
 */
export const KGSessionSpecs = createCollection({
  collectionName: 'KGSessionSpecs',

  typeName: 'KGSessionSpec',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  },
})

export default KGSessionSpecs
