import { UserModel } from './model.js';
import logger from '../../common/logger.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const createUser = async (req, res) => {
    try {
        const email = await UserModel.find({email: req.body.email});
        if (email.length > 0) {
            logger.error(`User with email ${req.body.email} already exists`);
            return res.status(409).json({error: `User with email ${req.body.email} already exists`});
        }
        const newUser = {
            name: req.body.name,
            email: req.body.email
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        user.password = hash;
        const savedUser = await UserModel.create(newUser);
        logger.info(`User created with id ${savedUser._id}`);
        res.status(201).json(savedUser);
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        logger.info(`Found ${users.length} users`);
        res.status(200).json(users);
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        logger.info(`Found user with id ${req.params.id}`);
        res.status(200).json(user);
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
}

const updateUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            logger.error(`User with id ${req.params.id} not found`);
            return res.status(404).json({error: `User with id ${req.params.id} not found`});
        }
        Object.keys(req.body).forEach(key => {
            user[key] = req.body[key];
        });
        const savedUser = await user.save();
        logger.info(`User with id ${req.params.id} updated`);
        res.status(200).json(savedUser);
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
}

const deleteUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            logger.error(`User with id ${req.params.id} not found`);
            return res.status(404).json({error: `User with id ${req.params.id} not found`});
        }
        await user.remove();
        logger.info(`User with id ${req.params.id} deleted`);
        res.status(200).json({message: `User with id ${req.params.id} deleted`});
    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
}

const login = async (req, res) => {
    try {
        const email = UserModel.find({email: req.body.email});
        if (email.length === 0) {
            logger.error(`User with email ${req.body.email} not found`);
            return res.status(404).json({error: `User with email ${req.body.email} not found`});
        }
        const user = email[0];
        const {password} = req.body;
        const userPassword = user.password;
        const match = await bcrypt.compare(password, userPassword);
        if (!match) {
            logger.error(`Invalid password for user with email ${req.body.email}`);
            return res.status(401).json({error: `Invalid password for user with email ${req.body.email}`});
        }

        const token = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '6h'});
        logger.info(`User with email ${req.body.email} logged in`);
        res.status(200).json({message: "Login Successfull", token: token});

    } catch (err) {
        logger.error(err);
        res.status(500).json({error: err});
    }
}
        






export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    login
}
