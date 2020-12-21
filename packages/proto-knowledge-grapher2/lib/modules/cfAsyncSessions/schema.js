/**
 * @summary CFAsyncSessions Schema
 * @type {Object}
 */
import {createSchema} from 'meteor/vulcan:core'

const teamSchema = createSchema({
  name: {
    type: String,
    optional: false,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  players: {
    type: Array,
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  'players.$': {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  teamId: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
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
   Time Stamp of session creation
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
    canCreate: ['members'],
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
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  /**
   * Section
   */
  sectionId: {
    type: String,
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

  // belows are SimpleText-dependent fields
  /**
   * Title
   */
  title: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  /**
   * Team
   */
  teams: {
    type: Array,
    optional: true,
    canRead: ['members'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  'teams.$': {
    type: teamSchema,
  },
}

export default schema
