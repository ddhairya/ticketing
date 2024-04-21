import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "../errors/authorization.error";

export const AuthenticationCheck = ( req: Request, res: Response, next: NextFunction) => {
    if(!req.currentUser){
        next( new AuthenticationError())
    }
    next()
}