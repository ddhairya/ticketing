import { scrypt, randomBytes } from "crypto";
import { promisify } from 'util'

const scryptAsycn = promisify(scrypt)

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
}