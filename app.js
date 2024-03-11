const express = require('express');
// import postsRouter from './posts.router.js'
const postsRouter = require('./posts.router.js');
const router = require('./posts.router.js');

const app = express();
const PORT = 3000;

/** (구현) **/

app.use(express.json())

app.use('/',router)

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`)
});