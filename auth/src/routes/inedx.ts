import express from 'express'
import { ClientRouter } from './client'

const router = express.Router()

const defaultRouter = [
    { path : '', route : ClientRouter}
]

defaultRouter.forEach( route => {
    router.use( route.path, route.route)
})


export { router}