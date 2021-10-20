import {RequestHandler} from 'express';
import { readFileSync, writeFileSync } from 'fs';
import axios from 'axios';
import path from 'path';
const {nasaKey} = require('../../config');
const nasaEndPoint:string = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const dataRoute:string = path.join(__dirname, '../../dates.txt')


export const getAllRoverImage: RequestHandler = (req, res) => {
  let {date}:any = req.query || 'notADate';
  const noImagePlaceHolder = ['https://www.segen.co.uk/wp-content/uploads/2020/12/SE-25000-R4-APP.jpg'];


  if (!date) {
    return res.send(noImagePlaceHolder)
  }

  const readFile = JSON.parse(readFileSync(dataRoute, 'utf8'));

  if (readFile[date]) { //check in cache/DB
    console.log('from cache/DB')
    return res.send(readFile[date]);
  } else { //Make API call
    console.log('API call to nasa')
    const params = {earth_date: date, api_key: nasaKey}
    axios.get(nasaEndPoint, {params})
        .then(({data}:any)=>{
          let arrayOfUrls: string[] = [];
          data.photos.forEach((photo: any)=>{
            arrayOfUrls = [...arrayOfUrls, photo.img_src]
          })
          if(arrayOfUrls.length === 0) {
            arrayOfUrls = noImagePlaceHolder;
          }
          let newPhotos = {[date]: arrayOfUrls}
          let imagesToSync = JSON.stringify({...readFile, ...newPhotos});
          writeFileSync(dataRoute, imagesToSync);
          res.send(arrayOfUrls)
        })
        .catch((error)=>{res.send(noImagePlaceHolder)})
  }
};