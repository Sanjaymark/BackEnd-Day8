import express from "express";
import {studentRouter} from "./Routes/students.js"
import dotenv from "dotenv"
import { userRouter } from "./Routes/users.js";

//initializing express server
const app = express();

//environmental configurations
dotenv.config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());


// application routes 
app.use("/students", studentRouter)
app.use("/user", userRouter);

//start the server
app.listen(PORT, () => console.log(`Server started in localhost:${PORT}`));