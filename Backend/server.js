const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
const mongoUri = process.env.MONGO_URL;

if (!mongoUri) {
  console.error('MONGO_URL is not defined in the environment variables');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log('DB connected successfully, listening on port ' + PORT);
    });
  })
  .catch((error) => console.log('Failed to connect to MongoDB', error));

// Use routes


module.exports = app;


