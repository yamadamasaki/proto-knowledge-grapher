import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for Programs.
 * @namespace Programs
 */
export const Programs = createCollection({
  collectionName: 'Programs',

  typeName: 'Program',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  },
})

export default Programs
