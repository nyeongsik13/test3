import express from 'express'
import postsRouter from './posts.router.js'


const app = express();
const PORT = 3000;

/** (구현) **/

app.use(express.json())

app.use('/api',postsRouter)

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`)
});