import mongoose from 'mongoose'
import {app} from './app'

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
