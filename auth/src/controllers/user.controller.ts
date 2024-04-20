import  { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator";
import { InputValidationError} from '../errors/validation.error'
import { User } from '../models'
import { BadRequestError } from "../errors/badrequest.error";


class UserController {
    static async login( req: Request , res : Response, next : NextFunction) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            next( new InputValidationError(errors.array()))
        }
        else{
            console.log(" Welcome to the app world")            
            res.status(200).send({ data : "Welcome to the app world "})
        }

    }

    static async signup( req: Request , res : Response, next : NextFunction) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            next( new InputValidationError(errors.array()))
        }
        else{
            const { email, password } = req.body
            const userExisits = await User.findOne  ({ email})

            if(userExisits){
                next(new BadRequestError ("Email in use, User already Exists"))
            }else{
                const user = User.build({ email, password})
                await user.save()
                res.status(201).send({ data : user, message: "User Added Successfully"})
            }
        }

    }
}



export default UserController