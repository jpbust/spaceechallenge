import express from 'express';

import routes from './routes/roverImage'


const app = express();

app.use('/images', routes);

const port:number = 3000;

app.listen(port, ()=>{
  console.log(`Server running at port: ${port}`)
});