import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for SimpleTexts.
 * @namespace SimpleTexts
 */
export const SimpleTexts = createCollection({
  collectionName: 'SimpleTexts',

  typeName: 'SimpleText',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
    canDelete: ['members'],
  },
})

export default SimpleTexts
