import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('Active');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4500/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4500/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const student = response.data;
        setName(student.name);
        setImage(student.image);
        setAge(student.age);
        setStatus(student.status);
        setIsEditing(true);
        setEditingId(id);
      };

      fetchStudent();
    }
  }, [id]);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:4500/students',
        { name, image, age, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/students');
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:4500/students/${editingId}`,
        { name, image, age, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/students');
    } catch (error) {
      console.error('Failed to update student:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:4500/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  return (
    <div className="container">
      <h2>Student Management</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>{isEditing ? 'Edit Student' : 'Add Student'}</h3>
          <form onSubmit={isEditing ? handleEditStudent : handleAddStudent}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Student' : 'Add Student'}
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h3>Students</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Age</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td><img src={student.image} alt={student.name} width="50" /></td>
                  <td>{student.age}</td>
                  <td>{student.status}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => navigate(`/edit-student/${student._id}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;