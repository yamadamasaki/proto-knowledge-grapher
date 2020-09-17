import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for Sections.
 * @namespace Sections
 */
export const Sections = createCollection({
  collectionName: 'Sections',

  typeName: 'Section',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
})

export default Sections
