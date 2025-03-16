const express = require('express');
const { register, loginUser } = require('../Controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', loginUser);

// Google Authentication routes

module.exports = router;