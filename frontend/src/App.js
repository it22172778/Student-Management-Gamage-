import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import StudentManagement from './components/StudentManagement';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={Register} />
          <Route path="/register" element={Register} />
          <Route path="/login" element={Login} />
          <Route path="/students" element={StudentManagement} />
          <Route path="/add-student" element={StudentManagement} />
          <Route path="/edit-student/:id" element={StudentManagement} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
