/**
 * @summary CFAsyncSessions Schema
 * @type {Object}
 */
import {createSchema} from 'meteor/vulcan:lib'

const teamSchema = createSchema({
  name: {
    type: String,
    optional: false,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  players: {
    type: Array,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  'players.$': {
    type: String,
    optional: true,
  },
})

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
    canCreate: ['members', 'reflector'],
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
    relation: {
      fieldName: 'program',
      typeName: 'Program',
      kind: 'hasOne',
    },
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  /**
   * Section
   */
  sectionId: {
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  /**
   * Subsection
   */
  subsection: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },

  // belows are SimpleText-dependent fields
  /**
   * Title
   */
  title: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  /**
   * Team
   */
  teams: {
    type: Array,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  'teams.$': {
    type: teamSchema,
  },
}

export default schema
