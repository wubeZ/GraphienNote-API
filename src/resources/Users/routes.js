import {Router} from 'express';
import usercontroller from './controller.js';
import auth from '../../middlewares/auth.js';

const router = Router();

router
    .route('/')
    .get(usercontroller.getAllUsers)
    .post(auth, usercontroller.createUser);

router
    .route('/login')
    .post(usercontroller.login);

router
    .route('/:id')
    .get(usercontroller.getUserById)
    .put(auth, usercontroller.updateUserById)
    .delete(auth, usercontroller.deleteUserById);


export default router;