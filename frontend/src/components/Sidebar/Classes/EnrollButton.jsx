import { useState, useEffect } from 'react';
import { postEnrollement, getStudentEnrolledShedule } from '../../../api/api';
import { UserPlus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const EnrollButton = ({ classId, studentId, onUpdate }) => {
  const [status,  setStatus]  = useState('checking');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!studentId) { setStatus('idle'); return; }
    const check = async () => {
      try {
        const res = await getStudentEnrolledShedule(studentId);
        const enrolled = res.data.some((c) => c.class_id === classId);
        setStatus(enrolled ? 'success' : 'idle');
      } catch {
        setStatus('idle');
      }
    };
    check();
  }, [studentId, classId]);

  const handleEnroll = async () => {
    setStatus('loading');
    try {
      await postEnrollement({ student_id: studentId, class_id: classId });
      setStatus('success');
      setMessage('');
      if (onUpdate) onUpdate();
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Failed to enroll');
    }
  };

  if (status === 'checking') {
    return (
      <button className='enroll-btn checking' disabled>
        <Loader2 size={16} className='enroll-spinner' />
        Checking…
      </button>
    );
  }

  if (status === 'success') {
    return (
      <button className='enroll-btn success' disabled>
        <CheckCircle size={16} /> Already Enrolled
      </button>
    );
  }

  return (
    <div className='enroll-container'>
      <button
        className={`enroll-btn ${status === 'loading' ? 'loading' : ''}`}
        onClick={handleEnroll}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? <Loader2 size={16} className='enroll-spinner' /> : <UserPlus size={16} />}
        {status === 'loading' ? 'Enrolling…' : 'Enroll Now'}
      </button>
      {status === 'error' && (
        <span className='enroll-error'>
          <AlertCircle size={12} /> {message}
        </span>
      )}
    </div>
  );
};

export default EnrollButton;