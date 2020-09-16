import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for Books.
 * @namespace Books
 */
export const Books = createCollection({
  collectionName: 'Books',

  typeName: 'Book',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
})

export default Books
