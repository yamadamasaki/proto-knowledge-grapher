/**
 * @summary CFNetwork Diagrams
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
    onCreate: () => new Date(),
  },
  /**
   Time Stamp of session update
   */
  updatedAt: {
    type: Date,
    optional: true,
    canRead: ['members'],
    onUpdate: () => new Date(),
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
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  /**
   * Section
   */
  sectionId: {
    type: String,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },
  /**
   * Subsection
   */
  subsection: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['admins'],
  },

  // belows are CFNetworkDiagram-dependent fields
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
