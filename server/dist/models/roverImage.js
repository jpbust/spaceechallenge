"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nasaApiGetPhotos = void 0;
const fs_1 = require("fs");
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const { nasaKey } = require('../../config');
const nasaEndPoint = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const dataRoute = path_1.default.join(__dirname, '../../dates.txt');
const nasaApiGetPhotos = (date) => {
    const readFile = JSON.parse(fs_1.readFileSync(dataRoute, 'utf8'));
    const params = { earth_date: date, api_key: nasaKey };
    axios_1.default.get(nasaEndPoint, { params })
        .then(({ data }) => {
        let arrayOfUrls = [];
        data.photos.forEach((photo) => {
            arrayOfUrls = [...arrayOfUrls, photo.img_src];
        });
        let newPhotos = { [date]: arrayOfUrls };
        let imagesToSync = JSON.stringify(Object.assign(Object.assign({}, readFile), newPhotos));
        fs_1.writeFileSync(dataRoute, imagesToSync);
        return arrayOfUrls;
    })
        .catch((error) => { console.log(error); })
        .then((data) => { return data; });
};
exports.nasaApiGetPhotos = nasaApiGetPhotos;
