import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineCheck, HiOutlineArrowDownTray } from 'react-icons/hi2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './EmployeeForm.css';

const steps = [
  { id: 1, label: 'Basic Details' },
  { id: 2, label: 'Employment' },
  { id: 3, label: 'Salary' },
  { id: 4, label: 'Address' },
  { id: 5, label: 'Emergency' },
  { id: 6, label: 'Documents' },
  { id: 7, label: 'Status' },
];

const getNextEmployeeId = () => {
  const saved = localStorage.getItem('bonton_employees');
  const employees = saved ? JSON.parse(saved) : [];
  const nextNum = employees.length + 1;
  return `EMP${String(nextNum).padStart(4, '0')}`;
};

const initialFormData = {
  // Step 1: Basic Details
  employeeId: '',
  firstName: '',
  lastName: '',
  fullName: '',
  gender: '',
  dateOfBirth: '',
  mobileNumber: '',
  emailId: '',

  // Step 2: Employment
  dateOfJoining: '',
  employmentType: '',
  department: '',
  designation: '',
  reportingManager: '',
  workLocation: '',
  company: 'BonTon Softwares Pvt Ltd',

  // Step 3: Salary
  basicSalary: '',
  payLevel: '',
  gradePay: '',
  allowances: '',
  bankName: '',
  bankAccountNumber: '',
  ifscCode: '',
  panNumber: '',
  pfNumber: '',
  esiNumber: '',

  // Step 4: Address
  permAddress1: '',
  permAddress2: '',
  permCity: '',
  permState: '',
  permPincode: '',
  sameAsPermanent: false,
  currAddress1: '',
  currAddress2: '',
  currCity: '',
  currState: '',
  currPincode: '',

  // Step 5: Emergency
  emergencyName: '',
  emergencyRelationship: '',
  emergencyPhone: '',

  // Step 6: Documents
  aadharCard: '',
  panCard: '',
  resume: '',
  offerLetter: '',
  joiningLetter: '',
  certificates: '',

  // Step 7: Status
  employeeStatus: 'Active',
  probationStatus: '',
  confirmationDate: '',
};

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    ...initialFormData,
    employeeId: getNextEmployeeId(),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };

      // Auto-generate full name
      if (name === 'firstName' || name === 'lastName') {
        updated.fullName = `${name === 'firstName' ? value : prev.firstName} ${name === 'lastName' ? value : prev.lastName}`.trim();
      }

      // Same as permanent address
      if (name === 'sameAsPermanent' && checked) {
        updated.currAddress1 = prev.permAddress1;
        updated.currAddress2 = prev.permAddress2;
        updated.currCity = prev.permCity;
        updated.currState = prev.permState;
        updated.currPincode = prev.permPincode;
      }

      return updated;
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [name]: file ? file.name : '',
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const saved = localStorage.getItem('bonton_employees');
    const employees = saved ? JSON.parse(saved) : [];
    employees.push(formData);
    localStorage.setItem('bonton_employees', JSON.stringify(employees));
    navigate('/employees');
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Employee Details', 14, 22);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Employee ID: ${formData.employeeId}`, 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 36);

    let y = 44;

    const addSection = (title, fields) => {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(252, 146, 0);
      doc.text(title, 14, y);
      y += 2;
      doc.setDrawColor(252, 146, 0);
      doc.line(14, y, 196, y);
      y += 6;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60);

      fields.forEach(([label, value]) => {
        if (y > 275) { doc.addPage(); y = 20; }
        doc.setFont('helvetica', 'bold');
        doc.text(`${label}:`, 14, y);
        doc.setFont('helvetica', 'normal');
        doc.text(String(value || '—'), 75, y);
        y += 6;
      });

      y += 4;
    };

    addSection('BASIC EMPLOYEE DETAILS', [
      ['Employee ID', formData.employeeId],
      ['First Name', formData.firstName],
      ['Last Name', formData.lastName],
      ['Full Name', formData.fullName],
      ['Gender', formData.gender],
      ['Date of Birth', formData.dateOfBirth],
      ['Mobile Number', formData.mobileNumber],
      ['Email ID', formData.emailId],
    ]);

    addSection('EMPLOYMENT DETAILS', [
      ['Date of Joining', formData.dateOfJoining],
      ['Employment Type', formData.employmentType],
      ['Department', formData.department],
      ['Designation', formData.designation],
      ['Reporting Manager', formData.reportingManager],
      ['Work Location', formData.workLocation],
      ['Company', formData.company],
    ]);

    addSection('SALARY & PAYROLL DETAILS', [
      ['Basic Salary', formData.basicSalary],
      ['Pay Level', formData.payLevel],
      ['Grade Pay', formData.gradePay],
      ['Allowances', formData.allowances],
      ['Bank Name', formData.bankName],
      ['Bank Account No', formData.bankAccountNumber],
      ['IFSC Code', formData.ifscCode],
      ['PAN Number', formData.panNumber],
      ['PF Number', formData.pfNumber],
      ['ESI Number', formData.esiNumber],
    ]);

    addSection('PERMANENT ADDRESS', [
      ['Address Line 1', formData.permAddress1],
      ['Address Line 2', formData.permAddress2],
      ['City', formData.permCity],
      ['State', formData.permState],
      ['Pincode', formData.permPincode],
    ]);

    addSection('CURRENT ADDRESS', [
      ['Address Line 1', formData.currAddress1],
      ['Address Line 2', formData.currAddress2],
      ['City', formData.currCity],
      ['State', formData.currState],
      ['Pincode', formData.currPincode],
    ]);

    addSection('EMERGENCY CONTACT', [
      ['Contact Name', formData.emergencyName],
      ['Relationship', formData.emergencyRelationship],
      ['Phone Number', formData.emergencyPhone],
    ]);

    addSection('DOCUMENTS', [
      ['Aadhar Card', formData.aadharCard],
      ['PAN Card', formData.panCard],
      ['Resume', formData.resume],
      ['Offer Letter', formData.offerLetter],
      ['Joining Letter', formData.joiningLetter],
      ['Certificates', formData.certificates],
    ]);

    addSection('STATUS', [
      ['Employee Status', formData.employeeStatus],
      ['Probation Status', formData.probationStatus],
      ['Confirmation Date', formData.confirmationDate],
    ]);

    doc.save(`${formData.employeeId}_${formData.firstName}_${formData.lastName}.pdf`);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-card">
            <h3 className="form-section-title">Basic Employee Details</h3>
            <p className="form-section-desc">These are mandatory identity fields</p>
            <div className="form-section-divider"></div>
            <div className="form-grid">
              <div className="form-group">
                <label>Employee ID</label>
                <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="EMP0001" />
                <span className="form-hint">Auto-generated or enter manually</span>
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} readOnly placeholder="Auto-generated" style={{ background: '#f8fafc' }} />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Enter mobile number" />
              </div>
              <div className="form-group">
                <label>Email ID</label>
                <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} placeholder="Enter email address" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-card">
            <h3 className="form-section-title">Employment Details</h3>
            <p className="form-section-desc">This defines their role in the organization</p>
            <div className="form-section-divider"></div>
            <div className="form-grid">
              <div className="form-group">
                <label>Date of Joining (DOJ)</label>
                <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Employment Type</label>
                <select name="employmentType" value={formData.employmentType} onChange={handleChange}>
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g., Software Engineer" />
              </div>
              <div className="form-group">
                <label>Reporting Manager</label>
                <input type="text" name="reportingManager" value={formData.reportingManager} onChange={handleChange} placeholder="Manager name" />
              </div>
              <div className="form-group">
                <label>Work Location / Branch</label>
                <input type="text" name="workLocation" value={formData.workLocation} onChange={handleChange} placeholder="e.g., Chennai" />
              </div>
              <div className="form-group full-width">
                <label>Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company name" />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-card">
            <h3 className="form-section-title">Salary & Payroll Details</h3>
            <p className="form-section-desc">Needed for HR + payroll logic</p>
            <div className="form-section-divider"></div>
            <div className="form-grid">
              <div className="form-group">
                <label>Basic Salary</label>
                <input type="number" name="basicSalary" value={formData.basicSalary} onChange={handleChange} placeholder="₹ 0.00" />
              </div>
              <div className="form-group">
                <label>Pay Level</label>
                <input type="text" name="payLevel" value={formData.payLevel} onChange={handleChange} placeholder="Enter pay level" />
              </div>
              <div className="form-group">
                <label>Grade Pay</label>
                <input type="text" name="gradePay" value={formData.gradePay} onChange={handleChange} placeholder="Enter grade pay" />
              </div>
              <div className="form-group">
                <label>Allowances</label>
                <input type="number" name="allowances" value={formData.allowances} onChange={handleChange} placeholder="₹ 0.00" />
              </div>
              <div className="form-group">
                <label>Bank Name</label>
                <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Enter bank name" />
              </div>
              <div className="form-group">
                <label>Bank Account Number</label>
                <input type="text" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} placeholder="Enter account number" />
              </div>
              <div className="form-group">
                <label>IFSC Code</label>
                <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="e.g., SBIN0001234" />
              </div>
              <div className="form-group">
                <label>PAN Number</label>
                <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} placeholder="e.g., ABCDE1234F" />
              </div>
              <div className="form-group">
                <label>PF Number (Optional)</label>
                <input type="text" name="pfNumber" value={formData.pfNumber} onChange={handleChange} placeholder="Enter PF number" />
              </div>
              <div className="form-group">
                <label>ESI Number (Optional)</label>
                <input type="text" name="esiNumber" value={formData.esiNumber} onChange={handleChange} placeholder="Enter ESI number" />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-card">
            <h3 className="form-section-title">Address Details</h3>
            <p className="form-section-desc">Permanent and current address information</p>
            <div className="form-section-divider"></div>

            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Permanent Address</h4>
            <div className="form-grid">
              <div className="form-group">
                <label>Address Line 1</label>
                <input type="text" name="permAddress1" value={formData.permAddress1} onChange={handleChange} placeholder="Street address" />
              </div>
              <div className="form-group">
                <label>Address Line 2</label>
                <input type="text" name="permAddress2" value={formData.permAddress2} onChange={handleChange} placeholder="Apartment, suite, etc." />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" name="permCity" value={formData.permCity} onChange={handleChange} placeholder="City" />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" name="permState" value={formData.permState} onChange={handleChange} placeholder="State" />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" name="permPincode" value={formData.permPincode} onChange={handleChange} placeholder="Pincode" />
              </div>
            </div>

            <div className="form-checkbox-row" style={{ marginTop: 20, marginBottom: 20 }}>
              <input type="checkbox" id="sameAsPermanent" name="sameAsPermanent" checked={formData.sameAsPermanent} onChange={handleChange} />
              <label htmlFor="sameAsPermanent">Current address same as permanent address</label>
            </div>

            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Current Address</h4>
            <div className="form-grid">
              <div className="form-group">
                <label>Address Line 1</label>
                <input type="text" name="currAddress1" value={formData.currAddress1} onChange={handleChange} placeholder="Street address" disabled={formData.sameAsPermanent} />
              </div>
              <div className="form-group">
                <label>Address Line 2</label>
                <input type="text" name="currAddress2" value={formData.currAddress2} onChange={handleChange} placeholder="Apartment, suite, etc." disabled={formData.sameAsPermanent} />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" name="currCity" value={formData.currCity} onChange={handleChange} placeholder="City" disabled={formData.sameAsPermanent} />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" name="currState" value={formData.currState} onChange={handleChange} placeholder="State" disabled={formData.sameAsPermanent} />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" name="currPincode" value={formData.currPincode} onChange={handleChange} placeholder="Pincode" disabled={formData.sameAsPermanent} />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-card">
            <h3 className="form-section-title">Emergency Contact</h3>
            <p className="form-section-desc">Emergency contact person details</p>
            <div className="form-section-divider"></div>
            <div className="form-grid">
              <div className="form-group">
                <label>Contact Name</label>
                <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} placeholder="Full name" />
              </div>
              <div className="form-group">
                <label>Relationship</label>
                <select name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange}>
                  <option value="">Select relationship</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} placeholder="Phone number" />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="form-card">
            <h3 className="form-section-title">Documents</h3>
            <p className="form-section-desc">Upload important employee documents</p>
            <div className="form-section-divider"></div>
            <div className="form-grid">
              {[
                { name: 'aadharCard', label: 'Aadhar Card' },
                { name: 'panCard', label: 'PAN Card' },
                { name: 'resume', label: 'Resume' },
                { name: 'offerLetter', label: 'Offer Letter' },
                { name: 'joiningLetter', label: 'Joining Letter' },
                { name: 'certificates', label: 'Certificates' },
              ].map((doc) => (
                <div className="form-group form-file-group" key={doc.name}>
                  <label>{doc.label}</label>
                  <input type="file" name={doc.name} onChange={handleFileChange} className="form-file-input" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                  {formData[doc.name] && <span className="form-file-name">✓ {formData[doc.name]}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="form-card">
            <h3 className="form-section-title">Status Fields</h3>
            <p className="form-section-desc">Employee status and probation details</p>
            <div className="form-section-divider"></div>
            <div className="form-grid">
              <div className="form-group">
                <label>Employee Status</label>
                <select name="employeeStatus" value={formData.employeeStatus} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Resigned">Resigned</option>
                  <option value="Terminated">Terminated</option>
                </select>
              </div>
              <div className="form-group">
                <label>Probation Status</label>
                <select name="probationStatus" value={formData.probationStatus} onChange={handleChange}>
                  <option value="">Select status</option>
                  <option value="On Probation">On Probation</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Extended">Extended</option>
                </select>
              </div>
              <div className="form-group">
                <label>Confirmation Date</label>
                <input type="date" name="confirmationDate" value={formData.confirmationDate} onChange={handleChange} />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="employee-form-page">
      {/* Back Button */}
      <button className="form-back-btn" onClick={() => navigate('/employees')}>
        <HiOutlineArrowLeft size={16} />
        Back to Employees
      </button>

      <h2 className="form-page-title">Employee Onboarding Form</h2>

      {/* Progress Bar */}
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className={`progress-step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
            >
              <div className="progress-step-circle">
                {currentStep > step.id ? <HiOutlineCheck size={16} /> : step.id}
              </div>
              <span className="progress-step-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`progress-connector ${currentStep > step.id ? 'completed' : ''}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <div className="form-nav-buttons">
        <div className="form-nav-left">
          {currentStep > 1 && (
            <button className="btn-prev" onClick={prevStep}>
              <HiOutlineArrowLeft size={16} />
              Previous
            </button>
          )}
        </div>

        <div className="form-nav-right">
          {currentStep === steps.length ? (
            <>
              <button className="btn-download" onClick={downloadPDF}>
                <HiOutlineArrowDownTray size={16} />
                Download Employee Details
              </button>
              <button className="btn-submit" onClick={handleSubmit}>
                <HiOutlineCheck size={16} />
                Submit
              </button>
            </>
          ) : (
            <button className="btn-next" onClick={nextStep}>
              Next
              <HiOutlineArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
