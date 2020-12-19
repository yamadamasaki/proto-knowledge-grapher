import {addRoute} from 'meteor/vulcan:core'

addRoute([
  // knowledge grapher
  {name: 'knowledge-grapher.top', path: '/', componentName: 'KnowledgeGrapherHome', layoutName: 'EJ2Layout'},
  // programs
  {name: 'programs.top', path: '/programs', componentName: 'ProgramsHome', layoutName: 'EJ2Layout'},
  {name: 'programs.item', path: '/programs/:id', componentName: 'ProgramsPage', layoutName: 'EJ2Layout'},

  // sections
  /// SimpleText
  {
    name: 'sections.simpleTextSection',
    path: '/sections/:programId/:collectionName/:sectionId/SimpleTextSection/',
    componentName: 'SimpleTextSection',
    layoutName: 'EJ2Layout',
  },
  {name: 'sections.simpleTextsHome', path: '/simpleTexts/', componentName: 'SimpleTextsHome', layoutName: 'EJ2Layout'},
  {name: 'sections.simpleText', path: '/simpleTexts/:id', componentName: 'SimpleTextSection', layoutName: 'EJ2Layout'},

  /// SimpleDiagram
  {
    name: 'sections.simpleDiagramSection',
    path: '/sections/:programId/:collectionName/:sectionId/SimpleDiagramSection/',
    componentName: 'SimpleDiagramSection',
    layoutName: 'EJ2Layout',
  },
  {
    name: 'sections.simpleDiagramsHome',
    path: '/simpleDiagrams/',
    componentName: 'SimpleDiagramsHome',
    layoutName: 'EJ2Layout',
  },
  {
    name: 'sections.simpleDiagram',
    path: '/simpleDiagrams/:id',
    componentName: 'SimpleDiagramSection',
    layoutName: 'EJ2Layout',
  },
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

  // users
  {name: 'users.profile', path: '/users/:slug', componentName: 'UsersProfile'},
  {name: 'users.account', path: '/account', componentName: 'UsersAccount'},
  {name: 'users.edit', path: '/users/:slug/edit', componentName: 'UsersEdit'},

// admin
  {name: 'admin.users', path: '/admin/users', componentName: 'AdminUsers'},

])
