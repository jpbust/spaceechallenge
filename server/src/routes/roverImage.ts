import {Router} from 'express';

const router = Router();

import {createRoverImage, getAllRoverImage} from '../controllers/roverImage'

router.get('/', getAllRoverImage);

router.post('/', createRoverImage)

export default router;