/**
 * @summary Simple Diagrams
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
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  /**
   * Diagram
   */
  diagram: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
}

export default schema
