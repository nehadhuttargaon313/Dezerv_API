const express = require('express');
const students = require('../controllers/student.controller.js');

const router = express.Router();

router.post('/students', students.create); // Create a new Student
router.get('/students', students.findAll); // Retrieve all Students
router.get('/students/:id', students.findOne); // Retrieve a single Student with id
router.put('/students/:id', students.update); // Update a Student with id
router.delete('/students/:id', students.delete); // Delete a Student with id

module.exports = router;
