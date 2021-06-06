import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

// putting this object here means that it can be accessed from the MikroORM CLI
export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false,
  },
  entities: [Post, User], // specify the DB tables here
  dbName: "lireddit",
  user: "postgres",
  password: "postgres",
  type: "postgresql",
  debug: !__prod__, // flag lets you see what SQL the ORM is generating
} as Parameters<typeof MikroORM.init>[0]; // the following is some advanced TS: Parameters extracts the params of the type provided, and returns it as an array
// so the line above is effectively saying, get the types of the parameters of the MikroORM.init function, and then we specify [0] to say the first param
// an alternative workaround is to say `as const`
