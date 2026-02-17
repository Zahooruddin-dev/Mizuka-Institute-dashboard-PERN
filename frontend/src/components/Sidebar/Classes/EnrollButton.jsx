import React, { useState } from 'react';
import { postEnrollment } from '../../../api/api';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

const EnrollButton = ({ classId, studentId, onUpdate }) => {
  const [status, setStatus] = useState('idle'); 
  const [message, setMessage] = useState('');

  const handleEnroll = async () => {
    setStatus('loading');
    try {
      await postEnrollment({ 
        student_id: studentId, 
        class_id: classId 
      });
      
      setStatus('success');
      setMessage('Enrolled!');
      if (onUpdate) onUpdate();
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to enroll');
    }
  };

  if (status === 'success') {
    return (
      <button className="enroll-btn success" disabled>
        <CheckCircle size={18} /> Enrolled
      </button>
    );
  }

  return (
    <div className="enroll-container">
      <button 
        className={`enroll-btn ${status === 'loading' ? 'loading' : ''}`}
        onClick={handleEnroll}
        disabled={status === 'loading'}
      >
        <UserPlus size={18} />
        {status === 'loading' ? 'Enrolling...' : 'Enroll Now'}
      </button>
      {status === 'error' && (
        <span className="enroll-error">
          <AlertCircle size={12} /> {message}
        </span>
      )}
    </div>
  );
};
export default EnrollButton