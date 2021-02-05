import {useMulti2} from 'meteor/vulcan:core'

const getDocuments = ({id, programId, sectionId, subsection, collectionName, fragmentName, pollInterval = 500}) => {
  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]
  if (subsection) selector.push({subsection: {_eq: subsection}})
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}
  return useMulti2({
    collectionName,
    fragmentName,
    input: {filter},
    pollInterval,
  })
}

// args = {id, programId, sectionId, subsection, collectionName, fragmentName, pollInterval = 500}
// return {loading, error, document, refetch}
const findSingleDocument = args => {
  const {results, loading, refetch, error} = getDocuments(args)
  if (loading) return {loading}
  if (error) return {error}
  const {programId, sectionId, subsection} = args
  const document =
      results && results.length !== 0 ?
          results[0] :
          subsection ? {programId, sectionId, subsection} : {programId, sectionId}
  return {document, refetch}
}

export {getDocuments, findSingleDocument}
