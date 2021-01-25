module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '188.166.211.64',
      username: 'root',
      // pem: './path/to/pem'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'proto-knowledge-grapher',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://demo.knowledge-grapher.cloud',
      MONGO_URL: 'mongodb://yamadamasaki:5B8-TSu-YAM-qQo@kg-dev-shard-00-00.hb9rw.mongodb.net:27017,kg-dev-shard-00-01.hb9rw.mongodb.net:27017,kg-dev-shard-00-02.hb9rw.mongodb.net:27017/demo-knowledge-grapher?ssl=true&replicaSet=atlas-12w2s4-shard-0&authSource=admin&retryWrites=true&w=majority',
      MONGO_OPLOG_URL: 'mongodb://yamadamasaki:5B8-TSu-YAM-qQo@kg-dev-shard-00-00.hb9rw.mongodb.net:27017,kg-dev-shard-00-01.hb9rw.mongodb.net:27017,kg-dev-shard-00-02.hb9rw.mongodb.net:27017/local?ssl=true&replicaSet=atlas-12w2s4-shard-0&authSource=admin&retryWrites=true&w=majority',
    },

    docker: {
      // abernix/meteord:node-12-base works with Meteor 1.9 - 1.10
      // If you are using a different version of Meteor,
      // refer to the docs for the correct image to use.
      image: 'abernix/meteord:node-12-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  // mongo: {
  //   version: '4.2.5',
  //   dbName: 'proto-knowledge-grapher',
  //   servers: {
  //     one: {}
  //   }
  // },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  proxy: {
    domains: 'demo.knowledge-grapher.cloud',

    ssl: {
      forceSSL: true,
      // Enable Let's Encrypt
      letsEncryptEmail: 'masaki@metabolics.co.jp'
    }
  }
};
