import React from 'react'
import {Components, registerComponent, useMulti2} from 'meteor/vulcan:core'
import {Helmet} from 'react-helmet'
import Users from 'meteor/vulcan:users'

const CFNetworkDiagramSubsession = ({match}) => {
  const {params} = match
  const {programId, sectionId, teamId} = params
  const {id} = params

  const selector = [{programId: {_eq: programId}}, {sectionId: {_eq: sectionId}}]
  const filter = (id && {_id: {_eq: id}}) || {_and: selector}
  const {results: teams, loading: loading_teams, error: error_teams} = useMulti2(
      {collectionName: 'KGTeams', fragmentName: 'KGTeamFragment', input: {filter}},
  )

  const {results: users, loading: loading_users, error: error_users} = useMulti2(
      {collection: Users, fragmentName: 'UsersMinimumInfo', input: {filter: {username: {_is_null: false}}}},
  )

  const subsessionName = teams && teams[0] && teams[0].title
  const team = teams && teams[0] && teams[0].teams && teams[0].teams.find(it => it.teamId === teamId)
  const teamName = team && team.name

  const userNames = users && team && team.players &&
      team.players.map(player => (users.find(user => user._id === player) || {}).username)
  const sectionName = `${teamName || 'Unnamed'} (${userNames && userNames.join(', ')})`

  return (
      <React.Fragment>
        {
          [error_teams, error_users].some(it => !!it) ? <Components.Flash message={{error_users, error_teams}}/> :
              [loading_users, loading_teams].some(it => it === true) ? <Components.Loading/> :
                  <React.Fragment>
                    <Helmet><title>Sync Session ({sectionId})</title></Helmet>
                    <Components.KGBreadCrumbs programId={programId} sectionId={sectionId}/>
                    <Components.KGSessionHeader sessionName={subsessionName}/>

                    <Components.KGSectionHeader sectionName={sectionName}/>
                    <Components.CFNetworkDiagramSection match={{
                      params: {
                        programId,
                        sectionId,
                        subsection: teamId,
                        isSavable: {groups: ['admins'], users: team && team.players},
                      },
                    }}/>
                  </React.Fragment>
        }
      </React.Fragment>
  )
}

registerComponent({name: 'CFNetworkDiagramSubsession', component: CFNetworkDiagramSubsession})
