"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRoverImage = exports.createRoverImage = void 0;
const roverImage_1 = require("../models/roverImage");
const fs_1 = require("fs");
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const { nasaKey } = require('../../config');
const nasaEndPoint = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const dataRoute = path_1.default.join(__dirname, '../../dates.txt');
let images = null;
const createRoverImage = (req, res) => {
    let { date } = req.body;
    if (images[date]) {
        //cachee
        res.send('image in cache');
    }
    else {
        // write the new data into txt.
        const params = { earth_date: date, api_key: nasaKey };
        axios_1.default.get(nasaEndPoint, { params })
            .then(({ data }) => {
            let array = [];
            data.photos.forEach((photo) => {
                array = [...array, photo.img_src];
            });
            let newPhotos = new roverImage_1.RoverImage(date, array);
            images = JSON.stringify(Object.assign(Object.assign({}, images), newPhotos));
            fs_1.writeFileSync(dataRoute, images);
            res.send(newPhotos);
        })
            .catch((error) => { console.log(error); });
    }
};
exports.createRoverImage = createRoverImage;
const getAllRoverImage = (req, res) => {
    // implement a type inferface for readFile
    const readFile = JSON.parse(fs_1.readFileSync(dataRoute, 'utf8'));
    images = readFile;
    res.send(readFile);
};
exports.getAllRoverImage = getAllRoverImage;
