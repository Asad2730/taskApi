import dotenv from 'dotenv';
import cors from "cors";
import express, { type Express } from "express";
import { route } from "./routes/route";
import mongoose from "mongoose";

dotenv.config();

const db_uri: string = process.env.DB || '';

const app: Express = express()


const Connect = async () => {
    try {
        app.use(cors())
        app.use(express.json())
        app.use('/api', route)



        await mongoose.connect(db_uri)

        app.listen(5000, () => console.log('listening on port 5000'))

    } catch (ex) {
        console.log('error connectiog to db', ex)
    }
}


Connect()