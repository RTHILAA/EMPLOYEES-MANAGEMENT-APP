import React from "react";
import "./Form.css";

export default function Form() {
    return (
        <div className="form">
            <h2>Add New Employee :</h2>
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
                    <input type="text" id="department" required />

                    <label htmlFor="position">
                        Position <span className="star">*</span>
                    </label>
                    <input type="text" id="position" required />

                    <label htmlFor="hiredate">
                        Hire Date <span className="star">*</span>
                    </label>
                    <input type="date" id="hiredate" required />

                    <label for="salary">Salary</label>
                    <input type="number" id="salary" placeholder="0.00" required />

                    <label htmlFor="status">
                        Status <span className="star">*</span>
                    </label>
                    <select id="status" required>
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
