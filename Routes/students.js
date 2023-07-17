import express from "express";
import {
  addStudent,
  deleteStudentbyId,
  editStudentbyId,
  getAllStudents,
  getStudentbyId,
} from "../Controllers/students.js";
//initializing router
const router = express.Router();

// get all student details with selective query
router.get("/all", async (req, res) => {
  try {
    const students = await getAllStudents(req);
    if (students.length <= 0) {
      return res.status(404).send({ message: "No Data available" });
    }
    res.status(200).send(students);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// find a specific one
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await getStudentbyId(id);
    if (!student) {
      return res.status(400).send({ message: "No content available" });
    }
    return res.status(200).send(student);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// add new student informations
router.post("/add", async (req, res) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      return res.status(400).send({ message: "No content available" });
    }
    const newStudent = await addStudent(req.body);

    if (!newStudent.acknowledged) {
      return res.status(400).send({ message: "Cannot add data" });
    }
    res.status(201).send({ result: newStudent, data: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// edit a student details 
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || Object.keys(req.body).length <= 0) {
      return res.status(400).send({ message: "Not a valid request" });
    }
    const editedResult = await editStudentbyId(id, req.body);

    res.status(200).send({ result: editedResult, data: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// delete a student details
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Not a valid request" });
    }
    const deletedResult = await deleteStudentbyId(id);
    res
      .status(200)
      .send({ result: deletedResult, sucess: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

export const studentRouter = router;