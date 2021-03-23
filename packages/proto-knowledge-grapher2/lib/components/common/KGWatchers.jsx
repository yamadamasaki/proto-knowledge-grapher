import React, {useEffect, useState} from 'react'
import {Components, registerComponent, useCreate2, useMulti2, useUpdate2, withCurrentUser} from 'meteor/vulcan:core'
import FaceIcon from '@material-ui/icons/Face'
import Users from 'meteor/vulcan:users'

const KGWatchers = ({match, currentUser}) => {
  const {
    programId, sectionId, subsection, id, collectionName = 'KGWatchers', fragmentName = 'KGWatcherFragment',
  } = match.params

  const [error, setError] = useState()
  const loadings = []

  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]
  if (subsection) selector.push({subsection: {_eq: subsection}})
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}
  const {results, refetch, loading: l_watchers, error: e_watchers} = useMulti2({
    collectionName,
    fragmentName,
    input: {filter},
  })
  if (l_watchers) loadings.watchers = l_watchers
  if (e_watchers) setError(e_watchers)

  const [updateDocument, {loading: l_update, error: e_update}] = useUpdate2({collectionName, fragmentName})
  if (l_update) loadings.update = l_update
  if (e_update) setError(e_update)

  const [createDocument, {loading: l_create, error: e_create}] = useCreate2({collectionName, fragmentName})
  if (l_create) loadings.create = l_create
  if (e_create) setError(e_create)

  const {results: users, loading: l_users} = useMulti2(
      {collection: Users, fragmentName: 'UsersMinimumInfo', input: {filter: {username: {_is_null: false}}}},
  )
  if (l_users) loadings.users = l_users

  const watchers = results && results.length !== 0 ?
      results[0] :
      subsection ? {programId, sectionId, subsection, watchers: []} : {programId, sectionId, watchers: []}

  const addMe = () => {
    if (watchers.watchers.includes(currentUser._id)) return
    watchers.watchers.push(currentUser._id)
    console.log({watchers})
    try {
      watchers._id ?
          updateDocument({input: {id: watchers._id, data: {watchers: watchers.watchers}}}) :
          createDocument({input: {data: watchers}})
      refetch()
    } catch (e) {
      setError(e)
    }
  }

  const removeMe = () => {
    if (!watchers.watchers.includes(currentUser._id)) return
    watchers.watchers = watchers.watchers.filter(it => it != currentUser._id)
    updateDocument({input: {id: watchers._id, data: {watchers: watchers.watchers}}})
  }

  useEffect(() => {
    addMe()
    return () => {
      removeMe()
    }
  }, [])

  if (error) return <Components.Flash message={error}/>
  if (Object.values(loadings).some(it => !!it)) return <Components.Loading/>

  return (
      <React.Fragment>
        <div>
          <FaceIcon/>
          {watchers.watchers.map(uid => users.find(it => uid === it._id).username).join(', ')}
        </div>
      </React.Fragment>
  )
}

registerComponent({name: 'KGWatchers', component: KGWatchers, hocs: [withCurrentUser]})
