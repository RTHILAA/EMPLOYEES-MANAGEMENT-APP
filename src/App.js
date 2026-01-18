import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import {
  UserRoundPen,
  UserRoundMinus,
  UserRoundPlus,
  SaveIcon,
  XCircle,
  Users,
  Calendar,
  DollarSign,
  Briefcase,
  Mail,
  Phone,
  Building,
  UserCheck,
  UsersRound,
  UserCog,
  UserX,
  CalendarDays,
  UserRound,
} from "lucide-react";

// StatsCard Component - intégré dans App.js
const StatsCard = ({ title, value, icon, color = 'primary', trend }) => {
  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-card-header">
        <div>
          <h3 className="stats-card-title">{title}</h3>
          <div className="stats-card-value">{value}</div>
        </div>
        <div className="stats-card-icon">
          {icon}
        </div>
      </div>
      <div className="stats-card-trend">
        {trend}
      </div>
    </div>
  );
};

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    fullname: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    hiredate: "",
    salary: "",
    status: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newEmployeeId, setNewEmployeeId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Calculate stats
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const onLeaveEmployees = employees.filter(emp => emp.status === 'On leave').length;
  const terminatedEmployees = employees.filter(emp => emp.status === 'Terminated').length;

  // Load employees from localStorage on initial render
  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  // Save employees to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setEmployee({ ...employee, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing employee
      const updatedEmployees = employees.map(emp =>
        emp.id === employee.id ? { ...employee } : emp
      );
      setEmployees(updatedEmployees);
      setIsEditing(false);
    } else {
      // Add new employee
      const NewEmp = {
        ...employee,
        id: Date.now(),
        hiredate: formatDate(employee.hiredate),
        salary: formatSalary(employee.salary)
      };
      setEmployees([NewEmp, ...employees]);
      setNewEmployeeId(NewEmp.id);

      // Clear highlight after animation
      setTimeout(() => setNewEmployeeId(null), 1000);
    }

    // Reset form
    setEmployee({
      fullname: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      hiredate: "",
      salary: "",
      status: ""
    });
  };

  const handleDelete = (id) => {
    setDeletingId(id);

    // Add animation delay before actual deletion
    setTimeout(() => {
      const UpdatedEmp = employees.filter(emp => emp.id !== id);
      setEmployees(UpdatedEmp);
      setDeletingId(null);
    }, 500);
  };

  const handleEdit = (id) => {
    const EditEmp = employees.find(emp => emp.id === id);
    setEmployee(EditEmp);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEmployee({
      fullname: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      hiredate: "",
      salary: "",
      status: ""
    });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSalary = (salary) => {
    if (!salary) return "";
    return parseFloat(salary).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'On leave': return 'status-on-leave';
      case 'Terminated': return 'status-terminated';
      default: return '';
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Header />

        {/* Stats Cards Section */}
        <div className="stats-section">
          <div className="title">
            <CalendarDays size={24} />
            <span>Dashboard Overview</span>
          </div>

          <div className="stats-grid">
            <StatsCard
              title="Total Employees"
              value={totalEmployees}
              icon={<UsersRound size={24} />}
              color="primary"
              trend={totalEmployees === 0 ? 'No employees yet' : 'Team is growing'}
            />


            <StatsCard
              title="Active"
              value={activeEmployees}
              icon={<UserCog size={24} />}
              color="success"
              trend={activeEmployees === 0 ? 'No active employees' : 'Employees currently active'}
            />

            <StatsCard
              title="On Leave"
              value={onLeaveEmployees}
              icon={<UserRoundPlus size={24} />}
              color="warning"
              trend={onLeaveEmployees === 0 ? 'No employees on leave' : 'Employees currently on leave'}
            />

            <StatsCard
              title="Terminated"
              value={terminatedEmployees}
              icon={<UserX size={24} />}
              color="danger"
              trend={terminatedEmployees === 0 ? 'No terminations this year' : 'Exits this year'}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="title">
            {isEditing ? <UserRoundPen size={24} /> : <UserRoundPlus size={24} />}
            <span>{isEditing ? 'Edit Employee' : 'Register Employee'}</span>
          </div>

          <div className="form-group">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullname" className="label-with-icon">
                  <UserRound size={16} />
                  <span>Full Name <span className="star">*</span></span>
                </label>
                <input
                  type="text"
                  id="fullname"
                  value={employee.fullname || ""}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="label-with-icon">
                  <Mail size={16} />
                  <span>Email <span className="star">*</span></span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={employee.email || ""}
                  onChange={handleChange}
                  placeholder="employee@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="label-with-icon">
                  <Phone size={16} />
                  <span>Phone <span className="star">*</span></span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={employee.phone || ""}
                  onChange={handleChange}
                  placeholder="+212 600 000 000"
                  required
                />
              </div>

              <div>
                <label htmlFor="department" className="label-with-icon">
                  <Building size={16} />
                  <span>Department <span className="star">*</span></span>
                </label>
                <select
                  id="department"
                  value={employee.department || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="IT">Information Technology (IT)</option>
                  <option value="HR">Human Resources (HR)</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div>
                <label htmlFor="position" className="label-with-icon">
                  <Briefcase size={16} />
                  <span>Position <span className="star">*</span></span>
                </label>
                <select
                  id="position"
                  value={employee.position || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Position</option>
                  <option value="IT Manager">IT Manager</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="Finance Manager">Finance Manager</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="HR Officer">HR Officer</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Sales Representative">
                    Sales Representative
                  </option>
                  <option value="System Administrator">
                    System Administrator
                  </option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Financial Analyst">Financial Analyst</option>
                  <option value="Sales Coordinator">Sales Coordinator</option>
                  <option value="Helpdesk Technician">Helpdesk Technician</option>
                </select>
              </div>

              <div>
                <label htmlFor="hiredate" className="label-with-icon">
                  <Calendar size={16} />
                  <span>Hire Date <span className="star">*</span></span>
                </label>
                <input
                  type="date"
                  id="hiredate"
                  className="hiredate"
                  value={employee.hiredate || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="salary" className="label-with-icon">
                  <DollarSign size={16} />
                  <span>Salary (MAD) <span className="star">*</span></span>
                </label>
                <input
                  type="number"
                  id="salary"
                  value={employee.salary || ""}
                  placeholder="0.00"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="status" className="label-with-icon">
                  <UserCheck size={16} />
                  <span>Status <span className="star">*</span></span>
                </label>
                <select
                  id="status"
                  value={employee.status || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="On leave">On Leave</option>
                  <option value="Terminated">Terminated</option>
                </select>
              </div>

              <div className="form-actions">
                {isEditing ? (
                  <>
                    <button type="submit" className="update-btn">
                      <SaveIcon className="add-icon" />
                      <span>Update Employee</span>
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={handleCancelEdit}
                    >
                      <XCircle className="add-icon" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button type="submit" className="add-btn">
                    <UserRoundPlus className="add-icon" />
                    <span>Add Employee</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="list-section">
          <div className="title">
            <Users size={24} />
            <span>Employees List ({employees.length})</span>
          </div>

          {employees.length === 0 ? (
            <div className="empty-state">
              <Users size={80} />
              <h3>No Employees Found</h3>
              <p>Start by adding your first employee using the form above.</p>
            </div>
          ) : (
            <div className="employees-table-container">
              <table className="employees-table">
                <thead>
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
                </thead>

                <tbody>
                  {employees.map((emp, index) => {
                    const rowClass = [
                      newEmployeeId === emp.id ? 'new-employee' : '',
                      deletingId === emp.id ? 'deleting' : '',
                      `row-${index % 2 === 0 ? 'even' : 'odd'}`
                    ].filter(Boolean).join(' ');

                    return (
                      <tr key={emp.id} className={rowClass} style={{ animationDelay: `${index * 0.05}s` }}>
                        <td>{emp.fullname}</td>
                        <td>{emp.email}</td>
                        <td>{emp.phone}</td>
                        <td>{emp.department}</td>
                        <td>{emp.position}</td>
                        <td>{formatDate(emp.hiredate)}</td>
                        <td className="salary-cell">{formatSalary(emp.salary)}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(emp.status)}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="actions">
                          <UserRoundPen
                            onClick={() => handleEdit(emp.id)}
                            className="edit-icon"
                            title="Edit"
                            size={32}
                          />
                          <UserRoundMinus
                            onClick={() => handleDelete(emp.id)}
                            className="delete-icon"
                            title="Delete"
                            size={32}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}