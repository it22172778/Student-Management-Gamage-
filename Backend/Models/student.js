const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  age: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;