const express = require('express');
const { addStudent, getStudents, updateStudent, deleteStudent } = require('../Controllers/studentController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addStudent);
router.get('/', authMiddleware, getStudents);
router.put('/:id', authMiddleware, updateStudent);
router.delete('/:id', authMiddleware, deleteStudent);

module.exports = router;