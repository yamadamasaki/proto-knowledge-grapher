import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for SimpleDiagrams.
 * @namespace SimpleDiagrams
 */
export const SimpleDiagrams = createCollection({
  collectionName: 'SimpleDiagrams',

  typeName: 'SimpleDiagram',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
    canDelete: ['members'],
  },
})

export default SimpleDiagrams
