/**
 * @summary KGChats schema
 * @type {Object}
 */
import {createSchema} from 'meteor/vulcan:core'

const messageSchema = createSchema({
  who: {
    type: String,
    optional: false,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  when: {
    type: Date,
    optional: false,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  text: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
})

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
   Time Stamp of session update
   */
  updatedAt: {
    type: Date,
    optional: true,
    canRead: ['members'],
    onUpdate: () => {return new Date()},
  },
  /**
   The session owner's `_id`.
   */
  userId: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['admins'],
    hidden: true,
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      relation: 'hasOne',
    },
  },

  /**
   * Program
   */
  programId: {
    type: String,
    optional: false,
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  /**
   * Section
   */
  sectionId: {
    type: String,
    optional: false,
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  /**
   * Subsection
   */
  subsection: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },

  /**
   * Title
   */
  title: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  /**
   * Messages
   */
  messages: {
    type: Array,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  'messages.$': {
    type: messageSchema,
  },
}

export default schema
