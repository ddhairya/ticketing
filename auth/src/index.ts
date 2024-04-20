import express from 'express'
import { router} from './routes/inedx'
import { errorHandler } from './middleware/error.middleware'
import mongoose from 'mongoose'

const app = express()

app.use( express.json())

app.use('/api', router)
app.use(errorHandler)


const start = async() => {
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
