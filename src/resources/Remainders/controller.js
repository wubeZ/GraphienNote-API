import {RemainderModel} from "./model.js";
import logger from "../../common/logger.js";

const createRemainder = async (req, res) => {
    try {
        const remainder = new RemainderModel(req.body);
        remainder.createdBy = req.user._id;
        const savedRemainder = await remainder.save();
        logger.info(`Remainder created with id ${savedRemainder._id}`);
        res.status(201).json(savedRemainder);
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
    }

const getAllRemainders = async (req, res) => {
    try {
        const remainders = await RemainderModel.find({createdBy: req.user._id});
        logger.info(`Found ${remainders.length} remainders`);
        res.status(200).json(remainders);
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
}

const getRemainderById = async (req, res) => {
    try {
        const remainder = await RemainderModel.findById(req.params.id);
        logger.info(`Found remainder with id ${req.params.id}`);
        res.status(200).json(remainder);
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
}

const updateRemainderById = async (req, res) => {
    try {
        const remainder = await RemainderModel.findById(req.params.id);
        if (!remainder) {
            logger.error(`Remainder with id ${req.params.id} not found`);
            return res.status(404).json({error: `Remainder with id ${req.params.id} not found`});
        }
        Object.keys(req.body).forEach(key => {
            remainder[key] = req.body[key];
        });
        const savedRemainder = await remainder.save();
        logger.info(`Remainder with id ${req.params.id} updated`);
        res.status(200).json(savedRemainder);
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
}

const deleteRemainderById = async (req, res) => {
    try {
        const remainder = await RemainderModel.findById(req.params.id);
        if (!remainder) {
            logger.error(`Remainder with id ${req.params.id} not found`);
            return res.status(404).json({error: `Remainder with id ${req.params.id} not found`});
        }
        await remainder.remove();
        logger.info(`Remainder with id ${req.params.id} deleted`);
        res.status(200).json({message: `Remainder with id ${req.params.id} deleted`});
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
}

export default {
    createRemainder,
    getAllRemainders,
    getRemainderById,
    updateRemainderById,
    deleteRemainderById
};