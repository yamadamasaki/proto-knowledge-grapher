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
   * Path
   */
  path: {
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
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
   * Type
   */
  type: {
    type: String,
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
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  /**
   * HtmlText
   */
  htmlText: {
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
}

export default schema
