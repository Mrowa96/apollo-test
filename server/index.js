const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const store = createStore();

const apolloServer = new ApolloServer({
  context: async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');

    if (!isEmail.validate(email)) {
      return { user: null };
    }

    const users = await store.users.findOrCreate({ where: { email } });
    const user = (users && users[0]) || null;

    return { user: { ...user.dataValues } };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  }),
});

apolloServer.listen().then(({ url }) => {
  console.info(`Server available at ${url}`);
});

// const app = fastify({
//     logger: true,
// });

// app.register(apolloServer.createHandler());

// app.get('/', function handler(request, reply){
//     reply.send({status: true})
// })

// app.listen(3001, function onError(error, address) {
//     if (error) {
//         app.log.error(error);
//         process.exit(1);
//     }
// })
