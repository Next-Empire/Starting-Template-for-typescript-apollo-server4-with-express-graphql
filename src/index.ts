import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { Resolvers } from "./api/graphql/resolver";

async function startApolloServer() {
  // build the schema
  const schema = await buildSchema({
    resolvers: [Resolvers],
  });

  // create an Apollo server instance
  const server = new ApolloServer({ schema });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server running at ${url}`);
}

startApolloServer();
