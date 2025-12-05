import React from 'react'
import "./List.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function List({ employees }) {
    return (
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
               {employees.map((emp) => (
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
          ))}
        </table>
        </div>
        );
}
