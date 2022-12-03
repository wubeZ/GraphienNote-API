import express, {request,response}  from "express";
import helmet from "helmet";
import cors from 'cors';
import '../src/common/env.js'
import routes from '../src/common/routes.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.urlencoded({extended : true})) // TODO: add limit for request
app.use(express.json())

app.get('/', (request, response)=>{
    response.status(200).json('health check: OK')
})

app.use('/v1/', routes)
export default app;