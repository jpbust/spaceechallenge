import {RequestHandler} from 'express';
import { readFileSync, writeFileSync } from 'fs';
import axios from 'axios';
import path from 'path';
const {nasaKey} = require('../../config');
const nasaEndPoint:string = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const dataRoute:string = path.join(__dirname, '../../dates.txt')

export const getAllRoverImage: RequestHandler = (req, res) => {
  let {date} = req.body;
  if (!date) {
    return res.send('missing params')
  }
  const readFile = JSON.parse(readFileSync(dataRoute, 'utf8'));

  if (readFile[date]) { //check in cache/DB
    res.send({[date]: readFile[date]});
  } else {
    const params = {earth_date: date, api_key: nasaKey}
    axios.get(nasaEndPoint, {params})
      .then(({data}:any)=>{
        let arrayOfUrls: string[] = [];
        data.photos.forEach((photo: any)=>{
          arrayOfUrls = [...arrayOfUrls, photo.img_src]
        })

        let newPhotos = {[date]: arrayOfUrls}
        let imagesToSync = JSON.stringify({...readFile, ...newPhotos});
        writeFileSync(dataRoute, imagesToSync);
        res.send(newPhotos);
      })
      .catch((error)=>{console.log(error)})
  }
};
