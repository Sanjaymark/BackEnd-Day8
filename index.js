import express from "express";
import {studentRouter} from "./Routes/students.js"
import dotenv from "dotenv"
import { userRouter } from "./Routes/users.js";
import { isAuthenticated } from "./Authentication/auth.js";
import cors from "cors";

//initializing express server
const app = express();

//environmental configurations
dotenv.config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors())

// application routes 
app.use("/students",isAuthenticated, studentRouter)
app.use("/user", userRouter);

//start the server
app.listen(PORT, () => console.log(`Server started in localhost:${PORT}`));