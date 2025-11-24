import React from 'react'
import "./List.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function List() {
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
            <tr>
                <td>John Doe</td>
                <td>gH6yS@example.com</td>
                <td>+1-202-555-0143</td>
                <td>IT</td>
                <td>Software Developer</td>
                <td>2022-01-01</td>
                <td>$50000</td>
                <td>Active</td>
                <td className="actions">
                    <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
                    <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                </td>
            </tr>
        </table>
    </div>
  )
}
