import React from 'react'
import "./List.css";

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
            </table>
    </div>
  )
}
