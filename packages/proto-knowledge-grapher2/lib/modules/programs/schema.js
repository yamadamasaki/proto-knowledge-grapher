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
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
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
    canRead: ['guests'],
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
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'textarea',
  },
  /**
   * Structure: TOC as an Object
   */
  structure: {
    type: Object,
    optional: true,
    canRead: ['guests'],
    onCreate: ({document}) => {
      console.log(document)
      if (document.structureAsJson) return JSON.parse(document.structureAsJson)
    },
    onUpdate: ({data}) => {
      console.log({data})
      if (data.structureAsJson) return JSON.parse(data.structureAsJson)
    },
  },
}

export default schema
