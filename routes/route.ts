import { Router } from "express";
import { Login, Register } from "../controller/user";

const route = Router()


route.post('/signup',Register)
route.post('/login',Login)

export {route}