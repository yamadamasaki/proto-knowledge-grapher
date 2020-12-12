import React, {useState} from 'react'
import {registerComponent} from 'meteor/vulcan:lib'
import {useCreate2, useMulti2, useUpdate2} from 'meteor/vulcan:core'
import {TextBoxComponent} from '@syncfusion/ej2-react-inputs'
import {MultiSelectComponent} from '@syncfusion/ej2-react-dropdowns'
import {ButtonComponent} from '@syncfusion/ej2-react-buttons'

const CFAsyncSession = ({match}) => {
  const {params} = match
  const collectionName = params.collectionName || 'CFAsyncSessions'
  const {programId, sectionId, subsection} = params
  const {id} = params

  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]
  if (subsection) selector.push({subsection: {_eq: subsection}})
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}
  const {results, refetch} = useMulti2({
    collectionName,
    fragmentName: 'CFAsyncSessionFragment',
    input: {filter},
    //pollInterval: 500,
  })

  if (results && results.length === 0) results[0] = {programId, sectionId, subsection}

  const [updateDocument, {loading: loading_u}] = useUpdate2({collectionName, fragmentName: 'CFAsyncSessionFragment'})
  const [createDocument, {loading: loading_c}] = useCreate2({collectionName, fragmentName: 'CFAsyncSessionFragment'})
  const [error, setError] = useState()

  const document = results && results[0] || {}
  if (!document.teams) document.teams = [{name: 'foo', players: ['foobar', 'foobaz']}]

  const onAddTeam = () => {

  }

  const onSave = async () => {
    console.log('save called')
    return
    try {
      document._id ?
          await updateDocument({input: {id: document._id, data: {teams: document.teams}}}) :
          await createDocument({input: {data: document}})
      refetch()
    } catch (e) {
      setError(e)
    }
  }

  const onDelete = async () => {
    console.log('delete called')
  }

  return (
      <React.Fragment>
        <h1>非同期セッション</h1>
        <h2>チームを作る</h2>
        <ButtonComponent onClick={onAddTeam}>Add New Team</ButtonComponent>
        {
          document.teams.map((team, index) => (
              <div key={index}>
                <div className="e-card" id="basic">
                  <div className="e-card-content">
                    <TextBoxComponent placeholder="Team Name" floatLabelType="Auto"/>
                    <MultiSelectComponent placeholder="Players" dataSource={['foo', 'bar', 'baz']}/>
                    <ButtonComponent onClick={onDelete}>Delete Team</ButtonComponent>
                    <ButtonComponent onClick={onSave}>Save Team</ButtonComponent>
                  </div>
                </div>
              </div>
          ))
        }
      </React.Fragment>
  )
}
registerComponent({name: 'CFAsyncSession', component: CFAsyncSession})
