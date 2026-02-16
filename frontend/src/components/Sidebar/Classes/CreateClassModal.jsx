import React, { useState } from 'react';
import { X, BookOpen, Clock } from 'lucide-react';
import '../../../css/Modal.css'; 
import { createClass } from '../../../api/api';

const CreateClassModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    class_name: '',
    time_in_pakistan: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createClass(formData);
      onSuccess(); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create class');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Class</h2>
          <button onClick={onClose} className="close-btn"><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <p className="error-message">{error}</p>}
          
          <div className="input-group">
            <label><BookOpen size={16} /> Class Name</label>
            <input
              type="text"
              placeholder="e.g. Advanced JavaScript"
              value={formData.class_name}
              onChange={(e) => setFormData({...formData, class_name: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <label><Clock size={16} /> Time (Pakistan Standard Time)</label>
            <input
              type="text"
              placeholder="e.g. 10:00 AM - 12:00 PM"
              value={formData.time_in_pakistan}
              onChange={(e) => setFormData({...formData, time_in_pakistan: e.target.value})}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Creating...' : 'Create Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClassModal;