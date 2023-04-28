import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import mongoose from "mongoose";
import https from "https";
import fs, { readFileSync } from "fs"; // import fs module
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import * as dotenv from "dotenv";
import resolvers from "./resolver/index.js";
import { EXPIRES } from "./utils/expireTokenUtils.js";
import { connectDb } from "./config/db.js";
import { rateLimitPlugin } from "./middlewares/rateLimiterMongoose.js";
import { formattedError } from "./interface/interfaces.js";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import authChecker from "./middlewares/authCheckerMiddleware.js";

async function startApolloServer() {
  // Enviromental config
  dotenv.config();

  //starting express server
  const app = express();

  // Read the SSL/TLS certificate files
  const certificate = fs.readFileSync("./sslcert/cert.pem", "utf8");
  const privateKey = fs.readFileSync("./sslcert/key.pem", "utf8");

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = https.createServer(
    {
      key: privateKey,
      cert: certificate,
    },
    app
  );

  //connecting to mongoose
  await connectDb();

  const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

  // create an Apollo server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }), //gracefully stop
      // {
      //   async requestDidStart(requestContext: requestContext) {
      //     await rateLimitPlugin(requestContext.contextValue.req.ip);
      //   },
      // },
    ],
    // formatError: (formattedError: formattedError) => {
    //   // Return a different error message
    //   if (
    //     formattedError.extensions?.code ===
    //     ApolloServerErrorCode.INTERNAL_SERVER_ERROR
    //   ) {
    //     return {
    //       ...formattedError,
    //       message: "Rate limit exceeded. Please try again in 30 minutes.",
    //       extensions: {
    //         ...formattedError.extensions,
    //         code: "RATE_LIMIT_EXCEEDED",
    //         http: { status: 429 },
    //         retryAfter: 1800, // retry after 30 minutes in seconds
    //       },
    //     };
    //   }

    //   // Otherwise return the formatted error. This error can also
    //   // be manipulated in other ways, as long as it's returned.
    //   return formattedError;
    // },
  });

  await server.start();

  app.use(
    "/",
    cors({ credentials: true }),
    bodyParser.json(),
    session({
      secret: process.env.SESSION_TOKEN!,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: EXPIRES.COOKIE_MAX_AGE,
        sameSite: "none",
        secure: true,
      }, //1.5 minutes
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
        dbName: "users",
        stringify: false,
        touchAfter: 24 * 3600, //session can be updated only after 24 hours
        crypto: {
          secret: process.env.MONGO_SESSION_TOKEN!,
        },
        autoRemove: "interval",
        autoRemoveInterval: EXPIRES.STORE_AUTO_REMOVE_INTERVAL, //check and delete the expired session within ? minutes
      }),
    }),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        req,
        user: await authChecker(req.sessionID, req.sessionStore),
      }),
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at ${process.env["SERVER"]}`);
}

startApolloServer();
