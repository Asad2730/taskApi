import { model, Schema, type Document } from "mongoose";


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}



const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   
})


const User = model<IUser>('auth', UserSchema)

export default User;