import mongoose from "mongoose";
import { Password } from "../middleware/password.middleware";


// describe the properties for new user
interface userAttributes {
    email: string
    password: string    
}

// describe the properties for user model
interface UserModel extends mongoose.Model<UserDoc>{
    build( attrs: userAttributes) : UserDoc
}

// describe the properties for user document
interface UserDoc extends mongoose.Document{
    email: string,
    password: string
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type : String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }, 
    {
        toJSON: {
            transform(doc, ret){
                ret.id = doc._id,
                delete ret._id,
                delete ret.password
            },
            versionKey : false
        }
    }
)

userSchema.pre("save", async function(done){
    if( this.isModified('password')){
        const hased = await Password.toHash(this.get('password'));
        this.set('password',hased);
    }
    done();
})

userSchema.statics.build = ( attrs: userAttributes) =>{
    return new User(attrs)
}

const User = mongoose.model<UserDoc , UserModel>('User', userSchema)

export { User }