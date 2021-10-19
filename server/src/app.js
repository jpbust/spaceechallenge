"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const roverImage_1 = __importDefault(require("./routes/roverImage"));
const app = express_1.default();
app.use(body_parser_1.json());
app.use('/images', roverImage_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
