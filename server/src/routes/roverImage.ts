import {Router} from 'express';

const router = Router();

import {getAllRoverImage} from '../controllers/roverImage'

router.get('/', getAllRoverImage);

export default router;