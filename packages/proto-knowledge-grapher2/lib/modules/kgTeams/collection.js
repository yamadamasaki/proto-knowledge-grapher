import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for KGTeams.
 * @namespace KGTeams
 */
export const KGTeams = createCollection({
  collectionName: 'KGTeams',

  typeName: 'KGTeam',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  },
})

export default KGTeams
