import express from 'express';
import {json} from 'body-parser';
let cors = require('cors');

import routes from './routes/roverImage'


const app = express();

app.use(json());

app.use(cors());

app.use('/images', routes);

const port:number = 3000;

app.listen(port, ()=>{
  console.log(`Server running at port: ${port}`)
});