import { NoteModel } from './model.js';
import logger from '../../common/logger.js';

const createNote = async (req, res) => {
    try {
        const note = new NoteModel(req.body);
        note.createdBy = req.user._id;
        const savedNote = await note.save();
        logger.info(`Note created with id ${savedNote._id}`);
        res.status(201).json(savedNote);
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: err });
    }
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find({ createdBy: req.user._id });
        logger.info(`Found ${notes.length} notes`);
        res.status(200).json(notes);
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: err });
    }
}

const getNoteById = async (req, res) => {
    try {
        const note = await NoteModel.findById(req.params.id);
        logger.info(`Found note with id ${req.params.id}`);
        res.status(200).json(note);
    } catch (err) {
        logger.error(err);
        res.status(500).json({ error: err });
    }
}

const updateNoteById = async (req, res) => {
    try{
        const note = await NoteModel.findById(req.params.id);
        if(!note){
            logger.error(`Note with id ${req.params.id} not found`);
            return res.status(404).json({ error: `Note with id ${req.params.id} not found` });
        }
        Object.keys(req.body).forEach(key => {
            note[key] = req.body[key];
        });
        const savedNote = await note.save();
        logger.info(`Note with id ${req.params.id} updated`);
        res.status(200).json(savedNote);
    }
    catch(err){
        logger.error(err);
        res.status(500).json({ error: err });
    }
}

const deleteNoteById = async (req, res) => {
    try{
        await NoteModel.findByIdAndDelete(req.params.id);
        logger.info(`Note with id ${req.params.id} deleted`);
        res.status(204).json({message: `Note with id ${req.params.id} deleted`});
    }
    catch(err){
        logger.error(err);
        res.status(500).json({ error: err });
    }
}

export default {
    createNote,
    getAllNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById
}