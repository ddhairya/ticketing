import { scrypt, randomBytes } from "crypto";
import { promisify } from 'util'
import jwt  from "jsonwebtoken";

const scryptAsycn = promisify(scrypt)

// Define the payload interface for the JWT token
interface JwtPayload {
    id: string;
    email: string;
    // Add more properties if needed
}

export class Password {
    
    static async toHash(password: string){
        const salt = randomBytes(8).toString('hex')
        const buf = (await scryptAsycn(password, salt, 64)) as Buffer

        return `${buf.toString('hex')}.${salt}`
    }

    static async comparePass( storePassword: string , enteredPassword: string) {
        const [hasedPassword, salt] = storePassword.split('.')
        const buf = ( await scryptAsycn(enteredPassword, salt,64)) as Buffer

        return buf.toString('hex') === hasedPassword

    }

    static generateJWT = (payload : JwtPayload) => {
        const token = jwt.sign(payload, process.env.JWT_KEY!);
        return token;
    }
}