const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ba836ae2792011db628c0683cbad2d4412279f620cec38fe5a420c1f368432bc367fae9bc6a0985d0b457566a41742d003fe13dba9968cfd48c1cce451894804";

// Register Function
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login Function
const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Admin not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    // Admin authenticated, generate JWT token
    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
      expiresIn: '5h',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.register = register;
exports.loginUser = loginUser;