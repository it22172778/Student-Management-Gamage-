const Student = require('../models/student');

exports.addStudent = async (req, res) => {
  const { name, image, age, status } = req.body;
  try {
    const student = new Student({ name, image, age, status });
    await student.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, image, age, status } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(id, { name, image, age, status }, { new: true });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndDelete(id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};