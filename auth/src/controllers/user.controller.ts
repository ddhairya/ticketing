import  { NextFunction, Request, Response } from "express"
import { BadRequestError } from "../errors/badrequest.error";
import { Password } from "../middleware/password.middleware";
import {User } from "../models";
import { currentUser } from "../middleware/currentUser.middleware";
import cookieSession from "cookie-session";

class UserController {
    
    static async login( req: Request , res : Response, next : NextFunction) {
        
        const { email, password } = req.body
        const userExisits = await User.findOne  ({ email})

        if(!userExisits){
            next(new BadRequestError ("User doesn't Exists, please Signup!"))
        }else{

            const passwordMatch = await Password.comparePass(userExisits.password , password)
            if( passwordMatch){
                const jwtUser = Password.generateJWT({ id: userExisits.id, email: userExisits.email})
                req.session = { 
                    jwt : jwtUser
                }
                res.status(200).send({ data : userExisits , message : "Login Successfully!"}) 
            }else{
                next ( new BadRequestError(" Password Mismatch, Please enter the correct the password"))
            }
        }
        

    }

    static async signup( req: Request , res : Response, next : NextFunction) {
        
        const { email, password } = req.body
        const userExisits = await User.findOne  ({ email})

        if(userExisits){
            next(new BadRequestError ("Email in use, User already Exists"))
        }else{
            const user = User.build({ email, password})
            await user.save()
            const jwtUser = Password.generateJWT({ id: user.id, email: user.email})

            req.session = { 
                jwt : jwtUser
            }
            res.status(201).send({ data : user, message: "User Added Successfully"})
        }
        

    }

    static async currentUser ( req : Request, res : Response, next : NextFunction){

        res.send( { data : req.currentUser || null})
    }

    static async signOut ( req : Request, res : Response, next : NextFunction){
        req.session = null

        res.send({data: null, message: "Logout Successfully"})

    }
}



export default UserController