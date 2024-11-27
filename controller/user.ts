import { type Request, type Response } from "express";
import User from "../model/user";
import { generateToken, isPasswordValid, isValidEmail } from "../middleware/authMidlleWare";


export const Register = async(req:Request,res:Response) => {
    try{
     const rs = await User.create(req.body)
     res.json('created')
    }catch(ex){
        res.json(ex)
    }
}


export const Login = async(req:Request,res:Response) => {
    try{
     const {email,password} = req.body
      if(!isValidEmail(email)){
        res.json('invalid email')
        return
    }

    if(!isPasswordValid(password)){
        res.json('invalid password format')
        return
    }

   
    const user = await User.findOne({email,password})
    if(!user){
        res.json('User not found')
        return
    }
   
    const token = generateToken(user.email)
    const payload = {user,token}

    res.json(payload)

    }catch(ex){
        res.json(ex)
    }
}