import { Request, Response, NextFunction } from "express";
import { validationResult  } from "express-validator"
import { InputValidationError } from "../errors/validation.error";

export const userInputErrorValidation = (    req: Request,    res: Response,    next: NextFunction) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        next( new InputValidationError(errors.array()))
    }

    next()
}