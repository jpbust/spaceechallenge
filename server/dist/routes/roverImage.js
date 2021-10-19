"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const roverImage_1 = require("../controllers/roverImage");
router.get('/', roverImage_1.getAllRoverImage);
router.post('/', roverImage_1.createRoverImage);
exports.default = router;
