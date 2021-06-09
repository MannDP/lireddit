# Docs of things I learned during this build

## Package.json

- `ts-node` can be pointed to a TypeScript file, and it can directly run it. But this is bad because: slow (performance is laggy), and production setup is always to compile to JS and then run that. So best practice would be to mimic that setup in dev.
- `tsc -w` run compiler for TypeScript with the `-w` (watch) flag. Spits out a `dist` folder with the compiler JavaScript.
- `nodemon` automatically watches the files, and will re-run with the newly compiled code.

## MikroORM

### Create

```javascript
const post = orm.em.create(Post, { title: "some title" }); // this is creating an object of the class Post (no DB interactions yet)
await orm.em.persistAndFlush(post); // connects to the DB and inserts this
```

### Find

```javascript
await orm.em.find(Post, {});
```

## Sessions

req.session.userId = user.id;

{userId: 1} -> send that to redis

1. sess:qwoeiuowqjoqjw -> { userId: 1 } in `redis`

2. express-session will set a cookie on my browser qwoieu9012798quw9euoe1i2uo (encrypt the sess:qwoeiuowqjoqjw with the secret)

3. when user makes a request
   qwoieu9012798quw9euoe1i2uo -> sent to the server

4. server decrypts the cookie
   qwoieu9012798quw9euoe1i2uo -> sess:qwoeiuowqjoqjw

5. server makes a request to redis
   sess:qwoeiuowqjoqjw -> { userId: 1 }

req.session = { userId: 1 }
