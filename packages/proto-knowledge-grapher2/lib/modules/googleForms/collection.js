import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for GoogleForms.
 * @namespace GoogleForms
 */
export const GoogleForms = createCollection({
  collectionName: 'GoogleForms',

  typeName: 'GoogleForm',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
    canDelete: ['members'],
  },
})

export default GoogleForms
