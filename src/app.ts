import express from 'express';
import {json} from 'body-parser';

import routes from './routes/roverImage'


const app = express();

app.use(json());
app.use('/images', routes);

const port:number = 3000;

app.listen(port, ()=>{
  console.log(`Server running at port: ${port}`)
});