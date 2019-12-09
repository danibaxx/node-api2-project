const express = require('express');
const welcomeRouter = require('./router/welcome');
const server = express();

server.use(express.json());

server.use('/', welcomeRouter);

server.listen(4000, () => {
  console.log('\n*** Server running on http://localhost:4000 ***\n')
})