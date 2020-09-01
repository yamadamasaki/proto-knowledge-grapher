Package.describe({
  name: 'proto-knowledge-grapher',
})

Package.onUse(api => {
  api.use([
    'promise',
    'vulcan:core@1.16.0',
    'vulcan:accounts@1.16.0',
  ])

  api.mainModule('lib/server/main.js', 'server')
  api.mainModule('lib/client/main.js', 'client')
})
