import { CustomeError } from "../errors/custom.error";

export class AuthenticationError extends CustomeError{
    statusCode = 401

    constructor(){
        super("Not Authorize")
        Object.setPrototypeOf(this, AuthenticationError.prototype)
    }

    serializeErrors() {
        return [
            { message : "Not Authorize to login"}
        ]
    }
}