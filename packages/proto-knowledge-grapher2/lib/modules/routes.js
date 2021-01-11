import {addRoute} from 'meteor/vulcan:core'

const adminAccessOptions = {groups: ['admins']}
const memberAccessOptions = {groups: ['members'], redirect: '/login'}

addRoute([
  // knowledge grapher
  {
    name: 'knowledge-grapher.top',
    path: '/',
    componentName: 'KnowledgeGrapherHome',
    layoutName: 'EJ2Layout',
    access: memberAccessOptions,
  },
  // programs
  {name: 'programs.top', path: '/programs', componentName: 'ProgramsHome', access: memberAccessOptions},
  {
    name: 'programs.item',
    path: '/programs/:id',
    componentName: 'ProgramsPage',
    layoutName: 'EJ2Layout',
    access: memberAccessOptions,
  },

  // sessions
  /// CFPrepSession
  {
    name: 'sessions.cfPrepSession',
    path: '/sections/:programId/:collectionName/:sectionId/CFPrepSession/',
    componentName: 'CFPrepSession',
    layoutName: 'EJ2Layout',
    access: memberAccessOptions,
  },
  /// CFSyncSession
  {
    name: 'sessions.cfSyncSession',
    path: '/sections/:programId/:collectionName/:sectionId/CFSyncSession/',
    componentName: 'CFSyncSession',
    layoutName: 'EJ2Layout',
    access: memberAccessOptions,
  },
  {
    name: 'sessions.csFrameworkDiagramSubsession',
    path: '/sections/:programId/:collectionName/:sectionId/:teamId/CFFrameworkDiagramSubsession/',
    componentName: 'CFFrameworkDiagramSubsession',
    layoutName: 'EJ2Layout',
    access: memberAccessOptions,
  },
  /// CFAsyncSession
  {
    name: 'sessions.cfAsyncSession',
    path: '/sections/:programId/:collectionName/:sectionId/CFAsyncSession/',
    componentName: 'CFAsyncSession',
    layoutName: 'EJ2Layout',
    access: memberAccessOptions,
  },
  {
    name: 'sessions.cfNetworkDiagramSubsession',
    path: '/sections/:programId/:collectionName/:sectionId/:teamId/CFNetworkDiagramSubsession/',
    componentName: 'CFNetworkDiagramSubsession',
    layoutName: 'EJ2Layout',
    access: memberAccessOptions,
  },
  /// CFFollowupSession
  {
    name: 'sessions.cfFollowupSession',
    path: '/sections/:programId/:collectionName/:sectionId/CFFollowupSession/',
    componentName: 'CFFollowupSession',
    layoutName: 'EJ2Layout',
    access: memberAccessOptions,
  },

  // users
  {name: 'users.profile', path: '/users/:slug', componentName: 'UsersProfile'},
  {name: 'users.account', path: '/account', componentName: 'UsersAccount'},
  {name: 'users.edit', path: '/users/:slug/edit', componentName: 'UsersEdit'},
  {name: 'users.login', path: '/login', componentName: 'LoginPage'},

// admin
  {name: 'admin.users', path: '/admin/users', componentName: 'AdminUsers', access: adminAccessOptions},

])
