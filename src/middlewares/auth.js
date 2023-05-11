import logger from "../common/logger.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded._id;
        req.userData = decoded;
        next();
    } catch (err) {
        logger.error(err);
        return res.status(401).json({ error: "Not Authorized" });
    }
}


export default auth;