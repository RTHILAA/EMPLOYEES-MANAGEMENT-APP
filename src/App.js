import React, { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function App() {

  // LIST OF EMPLOYEES
  const [employees, setEmployees] = useState([]);

  // EMPLOYEE BEING TYPED IN FORM
  const [currentEmployee, setCurrentEmployee] = useState({});

  // UPDATE CURRENT EMPLOYEE WHILE TYPING
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setCurrentEmployee({ ...currentEmployee, [id]: value });
  };

  // ADD EMPLOYEE TO LIST
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmployees([...employees, currentEmployee]);
  };

  return (
    <div className="App">
      <div className="container">
        <Header />

        {/* ---------- FORM ---------- */}
        <div className="form">
          <span className="title">Add New Employee :</span>

          <div className="form-group">
            <form onSubmit={handleSubmit}>

              <label htmlFor="fullname">Full Name <span className="star">*</span></label>
              <input type="text" id="fullname" required onChange={handleChange} />

              <label htmlFor="email">Email <span className="star">*</span></label>
              <input type="email" id="email" required onChange={handleChange} />

              <label htmlFor="phone">Phone <span className="star">*</span></label>
              <input type="tel" id="phone" required onChange={handleChange} />

              <label htmlFor="department">Department <span className="star">*</span></label>
              <select id="department" required onChange={handleChange}>
                <option value="">Select Employee Department</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="HR">Human Resources (HR)</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>

              <label htmlFor="position">Position <span className="star">*</span></label>
              <select id="position" required onChange={handleChange}>
                <option value="">Select Employee Position</option>
                <option value="IT Manager">IT Manager</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Finance Manager">Finance Manager</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="Software Developer">Software Developer</option>
                <option value="HR Officer">HR Officer</option>
                <option value="Accountant">Accountant</option>
                <option value="Sales Representative">Sales Representative</option>
                <option value="System Administrator">System Administrator</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Financial Analyst">Financial Analyst</option>
                <option value="Sales Coordinator">Sales Coordinator</option>
                <option value="Helpdesk Technician">Helpdesk Technician</option>
              </select>

              <label htmlFor="hiredate">Hire Date <span className="star">*</span></label>
              <input type="date" id="hiredate" required onChange={handleChange} />

              <label htmlFor="salary">Salary <span className="star">*</span></label>
              <input type="number" id="salary" placeholder="0.00 MAD" required onChange={handleChange} />

              <label htmlFor="status">Status <span className="star">*</span></label>
              <select id="status" required onChange={handleChange}>
                <option value="">Select Employee Status</option>
                <option value="active">Active</option>
                <option value="onleave">On Leave</option>
                <option value="terminated">Terminated</option>
              </select>

              <button type="submit">Add Employee</button>
            </form>
          </div>
        </div>

        {/* ---------- LIST ---------- */}
        <div className="list">
          <span className="title">Employees List :</span>

          <table className="employees-table">
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Position</th>
              <th>Hire Date</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

            {employees.map((emp) => {
              return (
              <tr>
                <td>{emp.fullname}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>{emp.hiredate}</td>
                <td>{emp.salary}</td>
                <td>{emp.status}</td>
                <td className="actions">
                  <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
                  <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                </td>
              </tr>
              )
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
