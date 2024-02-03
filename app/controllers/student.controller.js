const db = require("../models");
const Student = db.students;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.email || !req.body.firstName || !req.body.lastName) {
      res.status(400).send({
        message: "Content can't be empty!"
      });
      return;
    }
  
    // Create a Student
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
  
    // Save Student in the database
    try {
      const data = await Student.create(student);
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Student."
      });
    }
};


  
  exports.findAll = async (req, res) => {
    try {
      const students = await Student.findAll();
      res.send(students);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving students."
      });
    }
  };

  exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
      const student = await Student.findByPk(id);
      if (student) {
        res.send(student);
      } else {
        res.status(404).send({
          message: `Cannot find Student with id=${id}.`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error retrieving Student with id=" + id
      });
    }
  };
  
  exports.update = async (req, res) => {
    const id = req.params.id;
  
    try {
      const num = await Student.update(req.body, {
        where: { id: id }
      });
      
      if (num == 1) {
        res.send({
          message: "Student was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error updating Student with id=" + id
      });
    }
  };
  

  exports.delete = async (req, res) => {
    const id = req.params.id;
  
    try {
      const num = await Student.destroy({
        where: { id: id }
      });
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Could not delete Student with id=" + id
      });
    }
  };
  



