import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up(); // after establishing DB connection, first thing to do is to run migrations

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  // apply cors to all routes
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  // the order middleware is added to express is the order it will run in
  // since apollo will use session middleware, this has to come first
  app.use(
    session({
      name: "qid", // the name of the cookie
      store: new RedisStore({ client: redisClient, disableTouch: true }), // disable touch because we will just persist sessions indefinitely and remove them as needed
      secret: "asldnaskjdnofjef", // TODO: this is sensitive and should ideally be hidden in an environment variable
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true, // cannot access cookie in JavaScript frontend
        secure: __prod__, // cookie only works if https
        sameSite: "lax", // csrf
      },
      saveUninitialized: false, // no need to store empty sessions
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    // context object is accessible by all resolvers
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main();
