import React from "react";
import "./Form.css";

export default function Form() {
    return (
        <div className="form">
            <span className="title">Add New Employee :</span>
            <div className="form-group">
                <form>
                    <label htmlFor="fname">
                        First Name <span className="star">*</span>
                    </label>
                    <input type="text" id="fname" required />

                    <label htmlFor="lname">
                        Last Name <span className="star">*</span>
                    </label>
                    <input type="text" id="lname" required />

                    <label htmlFor="email">
                        Email <span className="star">*</span>
                    </label>
                    <input type="email" id="email" required />

                    <label htmlFor="phone">
                        Phone <span className="star">*</span>
                    </label>
                    <input type="tel" id="phone" required />

                    <label htmlFor="department">
                        Department <span className="star">*</span>
                    </label>
                    <select id="department" required>
                        <option value="">Select Employee Department</option>
                        <option value="it">Information Technology (IT)</option>
                        <option value="hr">Human Resources (HR)</option>
                        <option value="finance">Finance</option>
                        <option value="sales">Sales</option>
                    </select>

                    <label htmlFor="position">
                        Position <span className="star">*</span>
                    </label>
                    <select id="position" required>
                        <option value="">Select Employee Position</option>

                        <option value="it_manager">IT Manager</option>
                        <option value="hr_manager">HR Manager</option>
                        <option value="finance_manager">Finance Manager</option>
                        <option value="sales_manager">Sales Manager</option>

                        <option value="software_developer">Software Developer</option>
                        <option value="hr_officer">HR Officer</option>
                        <option value="accountant">Accountant</option>
                        <option value="sales_representative">Sales Representative</option>

                        <option value="system_administrator">System Administrator</option>
                        <option value="recruiter">Recruiter</option>
                        <option value="financial_analyst">Financial Analyst</option>
                        <option value="sales_coordinator">Sales Coordinator</option>
                        <option value="helpdesk_technician">Helpdesk Technician</option>
                    </select>


                    <label htmlFor="hiredate">
                        Hire Date <span className="star">*</span>
                    </label>
                    <input type="date" id="hiredate" required />

                    <label for="salary">Salary <span className="star">*</span></label>
                    <input type="number" id="salary" placeholder="0.00" required />

                    <label htmlFor="status">
                        Status <span className="star">*</span>
                    </label>
                    <select id="status" required>
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
