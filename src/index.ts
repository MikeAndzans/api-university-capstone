import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import typeDefs from './typeDefs.js'
import resolvers from './resolvers/index.js';

const app = express();

const httpServer = http.createServer(app);

const apolloServer = new ApolloServer({ 
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
});

await apolloServer.start();

app.use(
    '/graphql',
    express.json(),
    expressMiddleware(apolloServer)
);

await new Promise<void>((resolve) => httpServer.listen({port: 4000}, resolve));
console.log('Server listening at: http://localhost:4000/graphql');

app.get('/', (req, res) => { res.send('Hello World from Express! For graphQL access visit "/graphql"'); });