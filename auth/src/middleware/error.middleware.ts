import { Request, Response, NextFunction } from "express";
import { CustomeError } from '../errors/custom.error'

export const errorHandler = ( err: Error , req: Request, res: Response, next: NextFunction) => {
    if( err instanceof CustomeError) {
        console.log("customer")
        res.status(err.statusCode).send( {errors : err.serializeErrors()})
    }else{

        res.status(404).send({ errors : { message : "Something went Wrong"}})
    }

}