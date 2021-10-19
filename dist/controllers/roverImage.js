"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRoverImage = exports.createRoverImage = void 0;
const { nasaKey } = require('../../config');
const nasaEndPoint = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const fs_1 = require("fs");
const dataRoute = '/Users/cucho/Documents/coding/coding-challenges/spaceechallenge/dates.txt';
let images = [];
const createRoverImage = (req, res) => {
    const readFile = JSON.parse(fs_1.readFileSync(dataRoute, 'utf8'));
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
exports.createRoverImage = createRoverImage;
const getAllRoverImage = (req, res) => {
    const readFile = JSON.parse(fs_1.readFileSync(dataRoute, 'utf8'));
    images = readFile;
    res.send(readFile);
};
exports.getAllRoverImage = getAllRoverImage;
