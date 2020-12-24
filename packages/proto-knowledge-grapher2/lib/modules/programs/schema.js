import {Utils} from 'meteor/vulcan:core'

/**
 * @summary Programs schema
 * @type {Object}
 */
const schema = {
  /**
   ID
   */
  _id: {
    type: String,
    optional: true,
    canRead: ['members'],
  },
  /**
   Time Stamp of post creation
   */
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['members'],
    onCreate: () => {
      return new Date()
    },
  },
  /**
   * Creator
   */
  /**
   * updatedAt
   */
  /**
   Title
   */
  title: {
    type: String,
    optional: false,
    max: 500,
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    order: 20,
    searchable: true,
  },
  /**
   Slug
   */
  slug: {
    type: String,
    optional: true,
    canRead: ['members'],
    onCreate: ({document: post}) => {
      return Utils.slugify(post.title)
    },
    onUpdate: ({data}) => {
      if (data.title) {
        return Utils.slugify(data.title)
      }
    },
  },
  /**
   * Structure: TOC by JSON
   */
  structureAsJson: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'textarea',
  },
  /**
   * Structure: TOC as an Object
   */
  structure: {
    type: Object,
    optional: true,
    canRead: ['members'],
    onCreate: ({document}) => (document.structureAsJson ? JSON.parse(document.structureAsJson) : null),
    onUpdate: ({data}) => (data.structureAsJson ? JSON.parse(data.structureAsJson) : null),
  },
}

export default schema
