const express = require('express');
const welcomeRouter = require('./router/welcome');
const postRouter = require('./router/posts');
const server = express();

server.use(express.json());

server.use('/', welcomeRouter);
server.use('/api/posts', postRouter);

server.listen(4000, () => {
  console.log('\n*** Server running on http://localhost:4000 ***\n')
})