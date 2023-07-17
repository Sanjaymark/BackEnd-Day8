import {client} from "../db.js";

export function addUser(userInfo)
{
    return client
    .db("bootcamp")
    .collection("users")
    .insertOne(userInfo)
}

export function getUser(email)
{
    return client
    .db("bootcamp")
    .collection("users")
    .findOne({email:email})
}