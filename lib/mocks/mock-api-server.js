const path = require('path');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const jsonServer = require('json-server');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(path.join(__dirname, './db.json'));

server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.use(
  // A rewriter to handle language codes, e.g. /en/posts => /en-posts
  jsonServer.rewriter({
    '/*/*': `/$1-$2`
  })
);
server.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON test server is running at http://localhost:${port}`);
});
