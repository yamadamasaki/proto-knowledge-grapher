import React, {useRef, useState} from 'react'
import {Components, registerComponent, useCreate2, useMulti2, useUpdate2, withCurrentUser} from 'meteor/vulcan:core'
import Users from 'meteor/vulcan:users'
import {TextBoxComponent} from '@syncfusion/ej2-react-inputs'
import {MultiSelectComponent} from '@syncfusion/ej2-react-dropdowns'
import {Link} from 'react-router-dom'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'
import {v1 as uuidv1} from 'uuid'
import {isPermitted} from '../common/IfIHave'
import {removeTypename} from '../utils/removeTypename'

const generateTeamId = () => uuidv1()

const KGTeamSection = ({match, currentUser}) => {
  const {params} = match
  const collectionName = params.collectionName || 'KGTeams'
  const {programId, sectionId, subsection} = params
  const {id} = params
  const {delegatedCollectionName, delegatedComponentName, subsessionName} = params
  const {isEditable} = params
  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]
  if (subsection) selector.push({subsection: {_eq: subsection}})
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}
  const {results, refetch, loading: loading_r} = useMulti2({
    collectionName,
    fragmentName: 'KGTeamFragment',
    input: {filter},
    //pollInterval: 500,
  })

  if (results && results.length === 0) results[0] = {programId, sectionId, subsection, title: subsessionName}

  const {results: users, loading: loading_users} = useMulti2(
      {collection: Users, fragmentName: 'UsersMinimumInfo', input: {filter: {username: {_is_null: false}}}},
  )

  const [updateDocument, {loading: loading_u}] = useUpdate2({collectionName, fragmentName: 'KGTeamFragment'})
  const [createDocument, {loading: loading_c}] = useCreate2({collectionName, fragmentName: 'KGTeamFragment'})
  const [error, setError] = useState()

  const document = results && results[0] || {}

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

  if (!document.teams) document.teams = []
  const nTeams = document.teams.length

  const TeamComponent = props => {
    const name = useRef()
    const players = useRef()
    const {team, users, onSave, onDelete, placeholder} = props
    const save = () => {
      const target = {
        name: (name.current || {}).value,
        players: (players.current || {}).value,
        teamId: placeholder ? generateTeamId() : team.teamId,
      }
      onSave(target)
      if (placeholder) {
        name.current.value = ''
        players.current.value = []
      }
    }
    const url = `/sections/${programId}/${delegatedCollectionName}/${sectionId}/${team.teamId}/${delegatedComponentName}/`
    const readonly = !isPermitted(currentUser, isEditable)

    return (
        <div className="e-card" id="basic">
          <div className="e-card-content">
            <TextBoxComponent placeholder="Team Name" value={team && team.name} floatLabelType="Auto"
                              readonly={readonly} ref={name}/>
            <MultiSelectComponent
                placeholder="Players" value={team && team.players} dataSource={users}
                fields={{text: 'username', value: '_id'}} floatLabelType="Auto" readonly={readonly} ref={players}/>
            {
              team.teamId ? <div><Link to={url}>Team's Page</Link><br/></div> : <div></div>
            }
            <Components.IfIHave permission={isEditable}>
              {!placeholder ? <ButtonComponent onClick={onDelete}>Delete Team</ButtonComponent> : <div></div>}
              <ButtonComponent onClick={save}>{placeholder ? 'Create Team' : 'Save Team'}</ButtonComponent>
            </Components.IfIHave>
          </div>
        </div>
    )
  }

  return (
      <React.Fragment>
        {
          error ? <Components.Flash message={error}/> :
              [loading_c, loading_u, loading_r, loading_users].some(it => it === true) ? <Components.Loading/> :
                  document.teams.map((team, index) => (
                      <div key={index}>
                        <TeamComponent team={team} users={users} onSave={onSave(index)} onDelete={onDelete(index)}/>
                      </div>
                  ))
        }
        <Components.IfIHave permission={isEditable}>
          <hr/>
          <h4>チームを追加する</h4>
          <TeamComponent team={{}} users={users} onSave={onSave(nTeams)} placeholder={true}/>
        </Components.IfIHave>
      </React.Fragment>
  )
}

registerComponent({name: 'KGTeamSection', component: KGTeamSection, hocs: [withCurrentUser]})
