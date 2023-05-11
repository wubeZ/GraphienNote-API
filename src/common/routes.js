import {Router} from 'express'
const router = Router()

// routers import
import userRouter from '../resources/Users/routes.js'
import noteRouter from '../resources/Notes/routes.js'
import remainderRouter from '../resources/Remainders/routes.js'


// higher level routing
router.use('/user', userRouter)
router.use('/note', noteRouter)
router.use('/remainder', remainderRouter)

export default router;