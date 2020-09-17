import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for Pages.
 * @namespace Pages
 */
export const Pages = createCollection({
  collectionName: 'Pages',

  typeName: 'Page',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
})

export default Pages
