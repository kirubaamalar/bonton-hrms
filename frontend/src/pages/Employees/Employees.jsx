import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineUserPlus,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineUsers,
} from 'react-icons/hi2';
import './Employees.css';

const avatarColors = ['av1', 'av2', 'av3', 'av4', 'av5'];

const Employees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('bonton_employees');
    if (saved) {
      setEmployees(JSON.parse(saved));
    }
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      emp.employeeId?.toLowerCase().includes(term) ||
      emp.firstName?.toLowerCase().includes(term) ||
      emp.lastName?.toLowerCase().includes(term) ||
      emp.department?.toLowerCase().includes(term) ||
      emp.designation?.toLowerCase().includes(term)
    );
  });

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updated = employees.filter((_, i) => i !== index);
      setEmployees(updated);
      localStorage.setItem('bonton_employees', JSON.stringify(updated));
    }
  };

  const getInitials = (first, last) => {
    return `${(first || '')[0] || ''}${(last || '')[0] || ''}`.toUpperCase();
  };

  return (
    <div className="employees-page">
      {/* Header */}
      <div className="employees-header">
        <div className="employees-header-left">
          <h1>Employees</h1>
          <p>Manage your team members and their details</p>
        </div>
        <button
          className="add-employee-btn"
          onClick={() => navigate('/employees/add')}
          id="add-employee-btn"
        >
          <HiOutlineUserPlus size={18} />
          Add Employee
        </button>
      </div>

      {/* Search & Filter */}
      <div className="employees-toolbar">
        <div className="employees-search">
          <HiOutlineMagnifyingGlass className="employees-search-icon" />
          <input
            type="text"
            placeholder="Search by name, ID, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="employee-search-input"
          />
        </div>
        <button className="employees-filter-btn">
          <HiOutlineFunnel size={16} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="employees-table-wrapper">
        {filteredEmployees.length > 0 ? (
          <>
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Date of Joining</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 600, color: '#fc9200' }}>
                      {emp.employeeId}
                    </td>
                    <td>
                      <div className="emp-name-cell">
                        <div className={`emp-avatar ${avatarColors[index % 5]}`}>
                          {getInitials(emp.firstName, emp.lastName)}
                        </div>
                        <span className="emp-name-text">
                          {emp.firstName} {emp.lastName}
                        </span>
                      </div>
                    </td>
                    <td>{emp.department || '—'}</td>
                    <td>{emp.designation || '—'}</td>
                    <td>{emp.dateOfJoining || '—'}</td>
                    <td>
                      <span className={`emp-status ${(emp.employeeStatus || 'active').toLowerCase()}`}>
                        {emp.employeeStatus || 'Active'}
                      </span>
                    </td>
                    <td>
                      <div className="emp-actions">
                        <button
                          className="emp-action-btn"
                          title="View"
                          onClick={() => navigate(`/employees/add?view=${index}`)}
                        >
                          <HiOutlineEye />
                        </button>
                        <button
                          className="emp-action-btn delete"
                          title="Delete"
                          onClick={() => handleDelete(index)}
                        >
                          <HiOutlineTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="employees-info-bar">
              <span>Showing {filteredEmployees.length} of {employees.length} employees</span>
            </div>
          </>
        ) : (
          <div className="employees-empty">
            <div className="employees-empty-icon">
              <HiOutlineUsers />
            </div>
            <h3>No employees found</h3>
            <p>
              {searchTerm
                ? 'No employees match your search. Try a different term.'
                : 'Get started by adding your first employee to the system.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
