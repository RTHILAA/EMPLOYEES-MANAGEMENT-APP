import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import * as XLSX from 'xlsx';
import {
  UserRoundPen,
  UserRoundMinus,
  UserRoundPlus,
  CalendarOff,
  SaveIcon,
  XCircle,
  Calendar,
  DollarSign,
  Briefcase,
  Mail,
  Phone,
  Building,
  UsersRound,
  UserRoundCheck,
  UserRoundX,
  CalendarDays,
  UserRound,
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";

// StatsCard Component
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
  // Initialize states from localStorage
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  const [filteredEmployees, setFilteredEmployees] = useState([]);
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

  // States for search and filtering with localStorage
  const [searchTerm, setSearchTerm] = useState(() => {
    const savedSearch = localStorage.getItem('searchTerm');
    return savedSearch || "";
  });

  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem('filters');
    return savedFilters ? JSON.parse(savedFilters) : {
      department: "all",
      status: "all"
    };
  });

  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Save to localStorage when states change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  // Calculate stats
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const onLeaveEmployees = employees.filter(emp => emp.status === 'On leave').length;
  const terminatedEmployees = employees.filter(emp => emp.status === 'Terminated').length;

  // Filter and search employees
  useEffect(() => {
    let result = [...employees];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(emp =>
        emp.fullname?.toLowerCase().includes(term) ||
        emp.email?.toLowerCase().includes(term) ||
        emp.phone?.toLowerCase().includes(term) ||
        emp.department?.toLowerCase().includes(term) ||
        emp.position?.toLowerCase().includes(term) ||
        emp.status?.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.department !== "all") {
      result = result.filter(emp => emp.department === filters.department);
    }

    if (filters.status !== "all") {
      result = result.filter(emp => emp.status === filters.status);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // For numeric sorting of salaries
        if (sortConfig.key === 'salary') {
          aValue = parseFloat(aValue?.replace(/,/g, '') || 0);
          bValue = parseFloat(bValue?.replace(/,/g, '') || 0);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredEmployees(result);
  }, [employees, searchTerm, filters, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

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
      setEmployees([...employees, NewEmp]);
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

  // Function to export to Excel
  const exportToExcel = () => {
    // Prepare data for export
    const exportData = filteredEmployees.map(emp => ({
      'Full Name': emp.fullname,
      'Email': emp.email,
      'Phone': emp.phone,
      'Department': emp.department,
      'Position': emp.position,
      'Hire Date': formatDate(emp.hiredate),
      'Salary (MAD)': formatSalary(emp.salary),
      'Status': emp.status
    }));

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');

    // Generate Excel file
    const fileName = `employees_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Get unique options for filters
  const departments = useMemo(() => {
    const depts = [...new Set(employees.map(emp => emp.department))];
    return depts.filter(dept => dept);
  }, [employees]);

  const statuses = useMemo(() => {
    const stats = [...new Set(employees.map(emp => emp.status))];
    return stats.filter(stat => stat);
  }, [employees]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      department: "all",
      status: "all"
    });
    setSearchTerm("");
  };

  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="Header">
          <div className="header-content">
            <UsersRound className="header-icon" size={28} />
            <span>Employee Management System</span>
          </div>
        </div>

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
              icon={<UserRoundCheck size={24} />}
              color="success"
              trend={activeEmployees === 0 ? 'No active employees' : 'Employees currently active'}
            />

            <StatsCard
              title="On Leave"
              value={onLeaveEmployees}
              icon={<CalendarOff size={24} />}
              color="warning"
              trend={onLeaveEmployees === 0 ? 'No employees on leave' : 'Employees currently on leave'}
            />

            <StatsCard
              title="Terminated"
              value={terminatedEmployees}
              icon={<UserRoundX size={24} />}
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
                  <option 
                    value="IT" 
                    className="option-it"
                  >
                    Information Technology (IT)
                  </option>
                  <option 
                    value="HR" 
                    className="option-hr"
                  >
                    Human Resources (HR)
                  </option>
                  <option 
                    value="Finance" 
                    className="option-finance"
                  >
                    Finance
                  </option>
                  <option 
                    value="Sales" 
                    className="option-sales"
                  >
                    Sales
                  </option>
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
                  
                  {/* IT Positions */}
                  <optgroup label="Information Technology">
                    <option value="IT Manager">
                      IT Manager
                    </option>
                    <option value="Software Developer">
                      Software Developer
                    </option>
                    <option value="System Administrator">
                      System Administrator
                    </option>
                    <option value="Helpdesk Technician">
                      Helpdesk Technician
                    </option>
                  </optgroup>
                  
                  {/* HR Positions */}
                  <optgroup label="Human Resources">
                    <option value="HR Manager">
                      HR Manager
                    </option>
                    <option value="HR Officer">
                      HR Officer
                    </option>
                    <option value="Recruiter">
                      Recruiter
                    </option>
                  </optgroup>
                  
                  {/* Finance Positions */}
                  <optgroup label="Finance">
                    <option value="Finance Manager">
                      Finance Manager
                    </option>
                    <option value="Accountant">
                      Accountant
                    </option>
                    <option value="Financial Analyst">
                      Financial Analyst
                    </option>
                  </optgroup>
                  
                  {/* Sales Positions */}
                  <optgroup label="Sales">
                    <option value="Sales Manager">
                      Sales Manager
                    </option>
                    <option value="Sales Representative">
                      Sales Representative
                    </option>
                    <option value="Sales Coordinator">
                      Sales Coordinator
                    </option>
                  </optgroup>
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
                  <UserRound size={16} />
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
            <UsersRound size={24} />
            <span>Employees List ({filteredEmployees.length} of {employees.length})</span>
          </div>

          {/* Search and Filters Section */}
          <div className="search-filters-section">
            <div className="search-box-container">
              <div className="search-box">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search employees by name, email, phone, department, position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button
                    className="clear-search-btn"
                    onClick={() => setSearchTerm("")}
                    title="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="filter-actions">
                <button
                  className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} />
                  <span>Filters</span>
                  {Object.values(filters).some(f => f !== "all") && (
                    <span className="filter-badge"></span>
                  )}
                </button>

                <button
                  className="export-btn"
                  onClick={exportToExcel}
                  disabled={filteredEmployees.length === 0}
                >
                  <Download size={18} />
                  <span>Export Excel</span>
                </button>

                {(searchTerm || Object.values(filters).some(f => f !== "all")) && (
                  <button
                    className="clear-filters-btn"
                    onClick={clearFilters}
                  >
                    <X size={18} />
                    <span>Clear All</span>
                  </button>
                )}
              </div>
            </div>

            {showFilters && (
              <div className="filters-panel">
                <div className="filter-group">
                  <label className="filter-label">
                    <Building size={16} />
                    <span>Department</span>
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) => handleFilterChange('department', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">
                    <UserRound size={16} />
                    <span>Status</span>
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Statuses</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="active-filters">
                  {filters.department !== "all" && (
                    <span className="active-filter-tag">
                      Department: {filters.department}
                      <button onClick={() => handleFilterChange('department', 'all')}>
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {filters.status !== "all" && (
                    <span className="active-filter-tag">
                      Status: {filters.status}
                      <button onClick={() => handleFilterChange('status', 'all')}>
                        <X size={12} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {filteredEmployees.length === 0 ? (
            <div className="empty-state">
              <UsersRound size={80} />
              <h3>No Employees Found</h3>
              <p>
                {employees.length === 0
                  ? "Start by adding your first employee using the form above."
                  : "No employees match your search criteria. Try different filters or clear them to see all employees."
                }
              </p>
              {employees.length > 0 && filteredEmployees.length === 0 && (
                <button
                  className="clear-filters-btn"
                  onClick={clearFilters}
                  style={{ marginTop: '20px' }}
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="employees-table-container">
              <table className="employees-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('fullname')} className="sortable">
                      Full Name <SortIndicator columnKey="fullname" />
                    </th>
                    <th onClick={() => handleSort('email')} className="sortable">
                      Email <SortIndicator columnKey="email" />
                    </th>
                    <th onClick={() => handleSort('phone')} className="sortable">
                      Phone <SortIndicator columnKey="phone" />
                    </th>
                    <th onClick={() => handleSort('department')} className="sortable">
                      Department <SortIndicator columnKey="department" />
                    </th>
                    <th onClick={() => handleSort('position')} className="sortable">
                      Position <SortIndicator columnKey="position" />
                    </th>
                    <th onClick={() => handleSort('hiredate')} className="sortable">
                      Hire Date <SortIndicator columnKey="hiredate" />
                    </th>
                    <th onClick={() => handleSort('salary')} className="sortable">
                      Salary <SortIndicator columnKey="salary" />
                    </th>
                    <th onClick={() => handleSort('status')} className="sortable">
                      Status <SortIndicator columnKey="status" />
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEmployees.map((emp, index) => {
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