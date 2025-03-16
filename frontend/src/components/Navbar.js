import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-brand btn btn-link" onClick={() => navigate('/')}>Student Management</button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => navigate('/students')}>Students</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => navigate('/add-student')}>Add Student</button>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => navigate('/login')}>Login</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => navigate('/register')}>Register</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;