import mongoose from "mongoose";
import logger from '../common/logger.js';

const MONOGO_URI = env.process.MONOGO_URI

mongoose.connect(MONOGO_URI)

mongoose.Promise = global.Promise

const db  = mongoose.connection

db.on('error', (err) => logger.error('connection with db error', err))
db.on('close', () => logger.info('connection closed to db'))
db.once('open', () =>
  logger.info(`Connected to the database instance on ${MONGO_URI}`)
)

export default {
  Connection: db
}
