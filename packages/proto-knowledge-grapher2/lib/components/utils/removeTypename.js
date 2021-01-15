import mapValues from 'lodash/mapValues'
import omit from 'lodash/omit'

export const removeTypename = obj => {
  if (!obj) return obj
  if (typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(it => removeTypename(it))
  return mapValues(omit(obj, '__typename'), val => removeTypename(val))
}
