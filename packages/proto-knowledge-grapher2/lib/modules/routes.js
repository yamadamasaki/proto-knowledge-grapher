import {addRoute} from 'meteor/vulcan:core'
import SimpleDiagramSection from '../components/sections/SimpleDiagramSection'

addRoute([
  // programs
  {name: 'programs.top', path: '/programs', componentName: 'ProgramsHome'},
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
    component: SimpleDiagramSection,
    layoutName: 'EJ2Layout',
  },
  {name: 'sections.simpleDiagramsHome', path: '/simpleDiagrams/', componentName: 'SimpleDiagramsHome', layoutName: 'EJ2Layout'},
  {name: 'sections.simpleDiagram', path: '/simpleDiagrams/:id', component: SimpleDiagramSection, layoutName: 'EJ2Layout'},

  // posts

  {name: 'posts.top', path: '/', componentName: 'PostsHome'},
  {name: 'posts.new', path: '/new', componentName: 'PostsHome'},
  {name: 'posts.best', path: '/best', componentName: 'PostsHome'},
  {name: 'posts.category', path: '/category/:slug', componentName: 'PostsCategory'},
  {name: 'posts.single', path: '/posts/:_id/:slug?', componentName: 'PostsPage'},

  // users

  {name: 'users.profile', path: '/users/:slug', componentName: 'UsersProfile'},
  {name: 'users.account', path: '/account', componentName: 'UsersAccount'},
  {name: 'users.edit', path: '/users/:slug/edit', componentName: 'UsersEdit'},

  // admin

  {name: 'admin.categories', path: '/admin/categories', componentName: 'AdminCategories'},
  {name: 'admin.comments', path: '/admin/comments', componentName: 'AdminComments'},
  {name: 'admin.posts', path: '/admin/posts', componentName: 'AdminPosts'},
  {name: 'admin.users', path: '/admin/users', componentName: 'AdminUsers'},

])
