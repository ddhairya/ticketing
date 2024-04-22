import express from 'express'
import { router} from './routes/inedx'
import { errorHandler } from './middleware/error.middleware'
import cookieSession from 'cookie-session'

const app = express()
app.set('trust proxy', true) 
app.use( express.json())
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))
app.use('/api', router)
app.use(errorHandler)

export { app }