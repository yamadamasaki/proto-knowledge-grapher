import React, {useRef, useState} from 'react'
import {Components, registerComponent, useCreate2, useMulti2, useUpdate2} from 'meteor/vulcan:core'
import {TextBoxComponent} from '@syncfusion/ej2-react-inputs'
import {MultiSelectComponent} from '@syncfusion/ej2-react-dropdowns'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'
import Users from 'meteor/vulcan:users'
import omit from 'lodash/omit'
import mapValues from 'lodash/mapValues'
import {v1 as uuidv1} from 'uuid'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet'

const generateTeamId = () => uuidv1()

const removeTypename = obj => {
  if (!obj) return obj
  if (typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(it => removeTypename(it))
  return mapValues(omit(obj, '__typename'), val => removeTypename(val))
}

const CFAsyncSession = ({match}) => {
  const {params} = match
  const collectionName = params.collectionName || 'CFAsyncSessions'
  const {programId, sectionId, subsection} = params
  const {id} = params

  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]
  if (subsection) selector.push({subsection: {_eq: subsection}})
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}
  const {results, refetch, loading: loading_r} = useMulti2({
    collectionName,
    fragmentName: 'CFAsyncSessionFragment',
    input: {filter},
    //pollInterval: 500,
  })

  if (results && results.length === 0) results[0] = {programId, sectionId, subsection}

  const {results: users, loading: loading_users} = useMulti2(
      {collection: Users, fragmentName: 'UsersMinimumInfo', input: {filter: {username: {_is_null: false}}}},
  )

  const [updateDocument, {loading: loading_u}] = useUpdate2({collectionName, fragmentName: 'CFAsyncSessionFragment'})
  const [createDocument, {loading: loading_c}] = useCreate2({collectionName, fragmentName: 'CFAsyncSessionFragment'})
  const [error, setError] = useState()

  const document = results && results[0] || {}
  if (!document.teams) document.teams = []

  const onSave = index => (async team => {
    document.teams[index] = team
    try {
      document._id ?
          await updateDocument({input: {id: document._id, data: {teams: removeTypename(document.teams)}}}) :
          await createDocument({input: {data: document}})
      refetch()
    } catch (e) {
      setError(e)
    }
  })

  const onDelete = index => (async () => {
    document.teams.splice(index, 1)
    try {
      await updateDocument({input: {id: document._id, data: {teams: removeTypename(document.teams)}}})
      refetch()
    } catch (e) {
      setError(e)
    }
  })

  const nTeams = document.teams.length

  const TeamComponent = props => {
    const name = useRef()
    const players = useRef()
    const {team, users, onSave, onDelete, placeholder} = props
    const save = () => {
      const team = {name: (name.current || {}).value, players: (players.current || {}).value}
      if (placeholder) team.teamId = generateTeamId()
      onSave(team)
      if (placeholder) {
        name.current.value = ''
        players.current.value = []
      }
    }
    return (
        <div className="e-card" id="basic">
          <div className="e-card-content">
            <TextBoxComponent placeholder="Team Name" value={team && team.name} floatLabelType="Auto" ref={name}/>
            <MultiSelectComponent
                placeholder="Players" value={team && team.players} dataSource={users}
                fields={{text: 'username', value: '_id'}} floatLabelType="Auto" ref={players}/>
            {
              team.teamId ?
                  <div><Link
                      to={`/sections/${programId}/CFNetworkDiagrams/${sectionId}/${team.teamId}/CFNetworkDiagramSection`}>
                    Team's Page
                  </Link><br/></div> :
                  <div></div>
            }
            {!placeholder ? <ButtonComponent onClick={onDelete}>Delete Team</ButtonComponent> : <div></div>}
            <ButtonComponent onClick={save}>{placeholder ? 'Create Team' : 'Save Team'}</ButtonComponent>
          </div>
        </div>
    )
  }

  return (
      <React.Fragment>
        <Helmet><title>Async Session ({sectionId})</title></Helmet>
        <h1>非同期セッション</h1>
        <h2>チーム</h2>
        {
          error ? <Components.Flash message={error}/> :
              [loading_c, loading_u, loading_r, loading_users].some(it => it === true) ? <Components.Loading/> :
                  document.teams.map((team, index) => (
                      <div key={index}>
                        <TeamComponent team={team} users={users} onSave={onSave(index)} onDelete={onDelete(index)}/>
                      </div>
                  ))
        }
        <h4>チームを追加する</h4>
        <TeamComponent team={{}} users={users} onSave={onSave(nTeams)} placeholder={true}/>
      </React.Fragment>
  )
}

registerComponent({name: 'CFAsyncSession', component: CFAsyncSession})
