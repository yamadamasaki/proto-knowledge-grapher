import {Utils} from 'meteor/vulcan:core'

/**
 * @summary Pages schema
 * @type {Object}
 */
const schema = {
  /**
   ID
   */
  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  /**
   Time Stamp of post creation
   */
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onCreate: () => {
      return new Date()
    },
  },
  /**
   Title
   */
  title: {
    type: String,
    optional: false,
    max: 500,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'text',
    order: 20,
    searchable: true,
  },
  /**
   * SubPages
   */
  subPageIds: {
    type: Array,
    arrayItem: {
      type: String,
      optional: true,
    },
    optional: true,
    relation: {
      fieldName: 'subPages',
      typeName: '[Page]',
      kind: 'hasMany',
    },
  },
  /**
   * Contents
   */
  contents: {
    type: Array,
    optional: true,
  },
  'contents.$.id': String,
  'contents.$.type': String,
}

export default schema
