import { client } from "../db.js";
import { ObjectId } from "bson";

export function getAllStudents(req){
    return client
    .db("bootcamp")
    .collection("students")
    .find(req.query)
    .toArray();  
}

export function getStudentbyId(id){
  return client
  .db("bootcamp")
  .collection("students")
  .findOne({_id: new ObjectId(id)})
}

export function addStudent(data){
    return client
    .db("bootcamp")
    .collection("students")
    .insertOne(data);
}

export function editStudentbyId(id,data){
  return client
  .db("bootcamp")
  .collection("students")
  .findOneAndUpdate({_id: new ObjectId(id)}, {$set:data});
}

export function deleteStudentbyId(id){
  return client
  .db("bootcamp")
  .collection("students")
  .findOneAndDelete({_id: new ObjectId(id)})
}