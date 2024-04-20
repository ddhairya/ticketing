import express from 'express'
import UserRoutes from './user.route'

const ClientRouter = express.Router()

const defaultRouter = [
    { path : '/users', route : UserRoutes}
]

defaultRouter.forEach( route => {
    ClientRouter.use(route.path, route.route)
})


export {ClientRouter}