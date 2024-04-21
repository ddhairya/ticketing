import express from 'express'
import { router} from './routes/inedx'
import { errorHandler } from './middleware/error.middleware'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

const app = express()
app.set('trust proxy', true) 
app.use( express.json())
app.use(cookieSession({
    signed: false,
    secure: true
}))
app.use('/api', router)
app.use(errorHandler)


const start = async() => {
    if(!process.env.JWT_KEY){
        throw new Error(" JWT_KEY is not defined")
    }
    try {
        await mongoose.connect('mongodb://auth-db-srv:27017/auth')
        console.log("connected to DB")
        app.listen(5000, ()=> {
            console.log("Server is running on port 5000")
        })        
    } catch (error) {
        console.log(error)
    }
}

start()
