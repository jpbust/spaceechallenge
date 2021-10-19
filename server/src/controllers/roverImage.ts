import {RequestHandler} from 'express';
import {RoverImage} from '../models/roverImage'
import { readFileSync, writeFileSync } from 'fs';
import axios from 'axios';
import path from 'path';
const {nasaKey} = require('../../config');
const nasaEndPoint:string = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const dataRoute:string = path.join(__dirname, '../../dates.txt')


let images:any = null;


export const createRoverImage: RequestHandler = (req, res) => {
  let {date} = req.body;

  if (images[date]) {
    //cachee
    res.send('image in cache')
  } else {
    // write the new data into txt.
    const params = {earth_date: date, api_key: nasaKey}
    axios.get(nasaEndPoint, {params})
      .then(({data}:any)=>{
        let array: string[] = [];
        data.photos.forEach((photo: any)=>{
          array = [...array, photo.img_src]
        })
        let newPhotos = new RoverImage(date, array);
        images = JSON.stringify({...images, ...newPhotos});
        writeFileSync(dataRoute, images)
        res.send(newPhotos);
      })
      .catch((error)=>{console.log(error)})
  }
};


export const getAllRoverImage: RequestHandler = (req, res) => {
  // implement a type inferface for readFile
  const readFile = JSON.parse(readFileSync(dataRoute, 'utf8'));
  images = readFile;
  res.send(readFile);
};
