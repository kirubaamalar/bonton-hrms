import { useState } from 'react';
import { HiOutlinePlus, HiOutlineXMark } from 'react-icons/hi2';
import './Attendance.css';

const initialAssets = [
  {
    id: 'AST-1001',
    name: 'MacBook Pro 16"',
    type: 'Laptop',
    owner: 'John Doe',
    ownerImage: 'JD',
    status: 'Assigned',
    dateAssigned: '2023-01-15',
    serialNumber: 'C02CG123456',
  },
  {
    id: 'AST-1002',
    name: 'Dell UltraSharp 27"',
    type: 'Monitor',
    owner: 'Jane Smith',
    ownerImage: 'JS',
    status: 'Assigned',
    dateAssigned: '2023-03-22',
    serialNumber: 'CN-0XC123-4567',
  },
  {
    id: 'AST-1003',
    name: 'iPhone 13 Pro',
    type: 'Mobile Device',
    owner: 'Mike Johnson',
    ownerImage: 'MJ',
    status: 'In Repair',
    dateAssigned: '2022-11-05',
    serialNumber: 'F12GA345678',
  }
];

const Attendance = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'Laptop',
    assignmentType: 'Permanent Employee',
  });

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setShowDetailModal(false);
    setTimeout(() => setSelectedAsset(null), 300); // wait for animation
  };

  const handleCloseAdd = () => {
    setShowAddModal(false);
    setFormData({ name: '', type: 'Laptop', assignmentType: 'Permanent Employee' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = `AST-100${assets.length + 1}`;
    
    // Create new blank asset that feels like a real record
    const newAsset = {
      id: newId,
      name: formData.name,
      type: formData.type,
      owner: formData.assignmentType === 'Permanent Employee' ? 'Unassigned' : 'Contractor Pool',
      ownerImage: 'N/A',
      status: 'Available',
      dateAssigned: '—',
      serialNumber: `NEW-${Math.floor(Math.random() * 100000)}`,
      assignmentRule: formData.assignmentType
    };
    
    setAssets([...assets, newAsset]);
    handleCloseAdd();
  };

  return (
    <div className="assets-page">
      <div className="assets-header">
        <div>
          <h1>Assets</h1>
          <p>Manage company assets and hardware assignments</p>
        </div>
        <button className="add-asset-btn" onClick={() => setShowAddModal(true)}>
          <HiOutlinePlus size={20} />
          Add Asset
        </button>
      </div>

      <div className="assets-table-wrapper">
        <table className="assets-table">
          <thead>
            <tr>
              <th>Asset ID</th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Asset Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>
                  <span 
                    className="asset-id-link"
                    onClick={() => handleAssetClick(asset)}
                  >
                    {asset.id}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>{asset.name}</td>
                <td>{asset.type}</td>
                <td>
                  <div className="owner-cell">
                    <div className="owner-avatar">{asset.ownerImage}</div>
                    <span>{asset.owner}</span>
                  </div>
                </td>
                <td>
                  <span className={`asset-status ${asset.status.toLowerCase().replace(' ', '-')}`}>
                    {asset.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Asset Detail Modal */}
      {showDetailModal && selectedAsset && (
        <div className="modal-overlay" onClick={handleCloseDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Asset Details</h2>
              <button className="close-btn" onClick={handleCloseDetail}>
                <HiOutlineXMark size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Asset ID</span>
                  <span className="detail-value">{selectedAsset.id}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className="detail-value">
                    <span className={`asset-status ${selectedAsset.status.toLowerCase().replace(' ', '-')}`}>
                      {selectedAsset.status}
                    </span>
                  </span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">Asset Name</span>
                  <span className="detail-value">{selectedAsset.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Asset Type</span>
                  <span className="detail-value">{selectedAsset.type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Serial Number</span>
                  <span className="detail-value">{selectedAsset.serialNumber}</span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">Current Owner</span>
                  <div className="detail-owner-row mt-1">
                    <div className="owner-avatar">{selectedAsset.ownerImage}</div>
                    <span className="detail-value">{selectedAsset.owner}</span>
                  </div>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">Date Assigned</span>
                  <span className="detail-value">{selectedAsset.dateAssigned}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseDetail}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={handleCloseAdd}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Asset</h2>
              <button className="close-btn" onClick={handleCloseAdd}>
                <HiOutlineXMark size={24} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="asset-form">
                  <div className="form-group">
                    <label htmlFor="name">Asset Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="form-input" 
                      placeholder="e.g. MacBook Pro M2" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Asset Type</label>
                    <select 
                      id="type" 
                      name="type" 
                      className="form-select"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option value="Laptop">Laptop</option>
                      <option value="Monitor">Monitor</option>
                      <option value="Mobile Device">Mobile Device</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Server/Network">Server/Network</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="assignmentType">Assigning Rule to Employees</label>
                    <select 
                      id="assignmentType" 
                      name="assignmentType" 
                      className="form-select"
                      value={formData.assignmentType}
                      onChange={handleInputChange}
                    >
                      <option value="Permanent Employee">Permanent Employee Allocation</option>
                      <option value="Contractor Pool">Contractor Pool</option>
                      <option value="Temporary/Intern">Temporary / Intern</option>
                      <option value="Shared Device">Shared Device</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleCloseAdd}>Cancel</button>
                <button type="submit" className="btn-primary">Add Asset</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
