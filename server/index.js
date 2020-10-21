const { ApolloServer } = require('apollo-server');
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const store = createStore();

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
    })
});

apolloServer.listen().then(({url}) => {
    console.info(`Server available at ${url}`);
})

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