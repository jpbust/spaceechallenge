"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRoverImage = void 0;
const fs_1 = require("fs");
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const { nasaKey } = require('../../config');
const nasaEndPoint = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const dataRoute = path_1.default.join(__dirname, '../../dates.txt');
const getAllRoverImage = (req, res) => {
    let { date } = req.query || 'notADate';
    const noImagePlaceHolder = ['https://www.segen.co.uk/wp-content/uploads/2020/12/SE-25000-R4-APP.jpg'];
    if (!date) {
        return res.send(noImagePlaceHolder);
    }
    const readFile = JSON.parse(fs_1.readFileSync(dataRoute, 'utf8'));
    if (readFile[date]) { //check in cache/DB
        console.log('from cache/DB');
        return res.send(readFile[date]);
    }
    else { //Make API call
        console.log('API call to nasa');
        const params = { earth_date: date, api_key: nasaKey };
        axios_1.default.get(nasaEndPoint, { params })
            .then(({ data }) => {
            let arrayOfUrls = [];
            data.photos.forEach((photo) => {
                arrayOfUrls = [...arrayOfUrls, photo.img_src];
            });
            if (arrayOfUrls.length === 0) {
                arrayOfUrls = noImagePlaceHolder;
            }
            let newPhotos = { [date]: arrayOfUrls };
            let imagesToSync = JSON.stringify(Object.assign(Object.assign({}, readFile), newPhotos));
            fs_1.writeFileSync(dataRoute, imagesToSync);
            res.send(arrayOfUrls);
        })
            .catch((error) => { res.send(noImagePlaceHolder); });
    }
};
exports.getAllRoverImage = getAllRoverImage;
