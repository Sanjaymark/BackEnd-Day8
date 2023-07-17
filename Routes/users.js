import express from "express";
import bcrypt from "bcrypt";
import { addUser, getUser } from "../Controllers/users.js";

const router = express.Router();

router.post("/signup", async (req, res)=>
{
    try
    {
        //logic to signup

        //generate salt value
        const salt = await bcrypt.genSalt(10);
        
        const user = await getUser(req.body.email);

        if(!user)
        {
            //hash req.body password
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const hashedUser = await {...req.body, password: hashedPassword};

            //add the new user
            const result = await addUser(hashedUser);

            if(!result.acknowledged)
            {
                return res.status(400).send({message:"Error uploading please try again"});
            }
            return res.status(201).send({result, data: hashedUser});
        }

        //if user already exists
        res.status(400).send({message: "Given email already exists"}); 
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({message:"Internal Server error"});
    }
});

router.post("/login", async (req, res)=>
{
    try
    {
        //collecting the req.body and find user exist
        const user = await getUser(req.body.email);

        if(!user)
        {
            return res.status(400).send({message: "Invalid Email address"});
        }

        //check if the password is right
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword)
        {
            return res.status(400).send({message: "Invalid Password"});
        }
        res.status(200).send(user);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({message : "Internal server error"});
    }
})

export const userRouter = router;