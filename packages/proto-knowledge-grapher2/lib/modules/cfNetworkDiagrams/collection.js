import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for CFNetworkDiagrams.
 * @namespace CFNetworkDiagrams
 */
export const CFNetworkDiagrams = createCollection({
  collectionName: 'CFNetworkDiagrams',

  typeName: 'CFNetworkDiagram',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
    canDelete: ['members'],
  },
})

export default CFNetworkDiagrams
