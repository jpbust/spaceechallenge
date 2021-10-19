import {RequestHandler} from 'express';
const {nasaKey} = require('../../config');
const nasaEndPoint:string = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
import { readFileSync, writeFile } from 'fs';
const dataRoute:string = '/Users/cucho/Documents/coding/coding-challenges/spaceechallenge/dates.txt';

import {RoverImage} from '../models/roverImage'

let images: RoverImage[] = [];


export const createRoverImage: RequestHandler = (req, res) => {

  const readFile = JSON.parse(readFileSync(dataRoute, 'utf8'));





  res.send([readFile]);
  // res.send([readFile]);




  // async function fetchImages (date: string) {
  //   const params = {earth_date: date, api_key: nasaKey};
  //   try {
  //     const response = await axios.get(nasaEndPoint, {params})
  //     console.log(response)
  //     res.json({"message": 'New image added', "response": response});
  //   } catch(error) {
  //     console.log('error in reoverImageEndpoint: ' + error);
  //   }
  // };

  // const newImage = new RoverImage();

};

export const getAllRoverImage: RequestHandler = (req, res) => {
  const readFile = JSON.parse(readFileSync(dataRoute, 'utf8'));
  images = readFile;
  res.send(readFile);
};
