import {addRoute} from 'meteor/vulcan:core'

addRoute([
  // knowledge grapher
  {name: 'knowledge-grapher.top', path: '/', componentName: 'KnowledgeGrapherHome', layoutName: 'EJ2Layout'},
  // programs
  {name: 'programs.top', path: '/programs', componentName: 'ProgramsHome'},
  {name: 'programs.item', path: '/programs/:id', componentName: 'ProgramsPage', layoutName: 'EJ2Layout'},

  // sessions
  /// CFPrepSession
  {
    name: 'sessions.cfPrepSession',
    path: '/sections/:programId/:collectionName/:sectionId/CFPrepSession/',
    componentName: 'CFPrepSession',
    layoutName: 'EJ2Layout',
  },
  /// CFSyncSession
  {
    name: 'sessions.cfSyncSession',
    path: '/sections/:programId/:collectionName/:sectionId/CFSyncSession/',
    componentName: 'CFSyncSession',
    layoutName: 'EJ2Layout',
  },
  /// CFAsyncSession
  {
    name: 'sessions.cfAsyncSession',
    path: '/sections/:programId/:collectionName/:sectionId/CFAsyncSession/',
    componentName: 'CFAsyncSession',
    layoutName: 'EJ2Layout',
  },
  {
    name: 'sessions.cfAsyncSession.teams',
    path: '/sections/:programId/:collectionName/:sectionId/:subsection/CFNetworkDiagramSection/',
    componentName: 'CFNetworkDiagramSection',
    layoutName: 'EJ2Layout',
  },
  /// CFFollowupSession
  {
    name: 'sessions.cfFollowupSession',
    path: '/sections/:programId/:collectionName/:sectionId/CFFollowupSession/',
    componentName: 'CFFollowupSession',
    layoutName: 'EJ2Layout',
  },

  // users
  {name: 'users.account', path: '/account', componentName: 'UsersAccount'},
  {name: 'users.edit', path: '/users/:slug/edit', componentName: 'UsersEdit'},

// admin
  {name: 'admin.users', path: '/admin/users', componentName: 'AdminUsers'},

])
