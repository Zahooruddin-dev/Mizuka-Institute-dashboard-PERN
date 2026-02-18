import React, { useState } from 'react';
import { X, Megaphone, Send } from 'lucide-react';
import { postAnnouncement } from '../../../api/api';
import '../../../css/Modal.css';

const CreateAnnouncementModal = ({ classItem, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Calling your API: postAnnouncement(id, data)
      await postAnnouncement(classItem.id, formData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <div className="modal-header">
          <div className="header-title">
            <Megaphone size={20} className="text-indigo" />
            <h2>Post to {classItem.class_name}</h2>
          </div>
          <button onClick={onClose} className="close-btn"><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <p className="error-message">{error}</p>}
          
          <div className="input-group">
            <label>Announcement Title</label>
            <input
              type="text"
              placeholder="e.g. Midterm Schedule Update"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <label>Message Content</label>
            <textarea
              placeholder="Write your announcement here..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
              rows="5"
            ></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary">
              <Send size={16} />
              {loading ? 'Posting...' : 'Post Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;