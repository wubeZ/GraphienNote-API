import {Router} from 'express';
import notecontroller from './controller.js';
import auth from '../../middlewares/auth.js';

const router = Router();

router
    .route('/')
    .get(notecontroller.getAllNotes)
    .post(notecontroller.createNote);

router
    .route('/:id')
    .get(notecontroller.getNoteById)
    .put(auth, notecontroller.updateNoteById)
    .delete(auth, notecontroller.deleteNoteById);


export default router;