import React from 'react'
import {registerComponent, useMulti2} from 'meteor/vulcan:core'

const findPath = (me, target, path) => {
  if (!me.children || me.children.length === 0) return null
  if (me.name) path.push(me.name)
  if (me.children.find(it => it.id === target)) return path
  return me.children.map(it => findPath(it, target, Array.from(path))).find(it => it && it.length > 0)
}

const KGBreadCrumbs = ({programId, sectionId, sessionComponent, sessionName}) => {
  const {results, loading} = useMulti2(
      {collectionName: 'Programs', fragmentName: 'ProgramFragment', input: {filter: {_id: {_eq: programId}}}},
  )
  if (loading || !results || results.length === 0) return <div/>
  const program = results[0]

  const path = findPath(program.structure, sectionId, [])

  const programLink = <a href={`/programs/${programId}`}>{results[0].title}</a>
  const sections = path ? path.join(' / ') : ''
  const sessionLink = <a href={`/sections/${programId}/${sectionId}/${sessionComponent}`}>{sessionName}</a>

  return (
      <React.Fragment>
        {
          sessionName && sessionComponent ?
              <div>{programLink} / {sections} / {sessionLink}</div> :
              results[0].title ?
                  <div>{programLink} / {sections}</div> :
                  <div/>
        }
      </React.Fragment>
  )
}

registerComponent({name: 'KGBreadCrumbs', component: KGBreadCrumbs})
