import jwt from "jsonwebtoken";

 export function isAuthenticated(req,res, next)
{
    const token = req.headers["x-auth-token"];
    if(!token)
    {
        return res.status(400).send({message:"Invalid Authorization"})
    }
    jwt.verify(token, process.env.SECRET_KEY)
    next();
}