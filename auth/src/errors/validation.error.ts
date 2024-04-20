import { ValidationError} from 'express-validator'
import { CustomeError} from './custom.error'

export class InputValidationError extends CustomeError{
    statusCode = 400 
    
    constructor( public errors : ValidationError[]){
        super(" This is input Validation Error")
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, InputValidationError.prototype)
    }
    serializeErrors() {
        return this.errors.map(err => {
            const loc = err.type == "field" ?  err.path : ""
            return { message: err.msg, field: loc };
        });
    }
    
}
