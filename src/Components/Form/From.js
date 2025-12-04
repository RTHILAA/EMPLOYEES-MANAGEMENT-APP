import React from "react";
import "./Form.css"; 
import { useState } from "react"

export default function Form() {
    const [employees, setEmployees] = useState({})

    const handleChange = (e) => {
     const id = e.target.id;
     const value = e.target.value;
     setEmployees({...employees, [id]:value})
    }

    const handleClick = (e) => {
        e.preventDefault()
    }

    return (
        <div className="form">
            <span className="title">Add New Employee :</span>
            <div className="form-group">
                <form onSubmit={handleClick}>
                    <label htmlFor="fullname">
                        Full Name <span className="star">*</span>
                    </label>
                    <input type="text" id="fullname" required onChange={handleChange}/>

                    <label htmlFor="email">
                        Email <span className="star">*</span>
                    </label>
                    <input type="email" id="email" required onChange={handleChange} />

                    <label htmlFor="phone">
                        Phone <span className="star">*</span>
                    </label>
                    <input type="tel" id="phone" required onChange={handleChange}/>

                    <label htmlFor="department">
                        Department <span className="star">*</span>
                    </label>
                    <select id="department" required onChange={handleChange} >
                        <option value="">Select Employee Department</option>
                        <option value="IT">Information Technology (IT)</option>
                        <option value="HR">Human Resources (HR)</option>
                        <option value="Finance">Finance</option>
                        <option value="Sales">Sales</option>
                    </select>

                    <label htmlFor="position">
                        Position <span className="star">*</span>
                    </label>
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


                    <label htmlFor="hiredate">
                        Hire Date <span className="star">*</span>
                    </label>
                    <input type="date" id="hiredate" required onChange={handleChange} />

                    <label for="salary">Salary <span className="star">*</span></label>
                    <input type="number" id="salary" placeholder="0.00 MAD" required onChange={handleChange}/>

                    <label htmlFor="status">
                        Status <span className="star">*</span>
                    </label>
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
    );
}
