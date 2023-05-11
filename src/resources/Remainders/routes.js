import {Router} from 'express';
import remaindercontroller from './controller.js';
import auth from '../../middlewares/auth.js';

const router = Router()

router
    .route('/')
    .get(remaindercontroller.getAllRemainders)
    .post(auth, remaindercontroller.createRemainder);

router
    .route('/:id')
    .get(remaindercontroller.getRemainderById)
    .put(auth, remaindercontroller.updateRemainderById)
    .delete(auth, remaindercontroller.deleteRemainderById);


export default router;

