import schema from './schema.js'
import {createCollection} from 'meteor/vulcan:core'

/**
 * @summary The global namespace for Chapters.
 * @namespace Chapters
 */
export const Chapters = createCollection({
  collectionName: 'Chapters',

  typeName: 'Chapter',

  schema,

  permissions: {
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
})

export default Chapters
