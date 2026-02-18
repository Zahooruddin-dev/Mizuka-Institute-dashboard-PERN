import React, { useState, useEffect } from 'react';
import { X, BookOpen, Clock, Calendar, User, Shield, Megaphone, Loader2 } from 'lucide-react';
import '../../../css/Modal.css';
import { getClassById, getClassAnnouncements } from '../../../api/api';

const ClassDetailsModal = ({ classId, onClose }) => {
  const [classData,      setClassData]      = useState(null);
  const [announcements,  setAnnouncements]  = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [annLoading,     setAnnLoading]     = useState(true);

  useEffect(() => {
    if (!classId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await getClassById(classId);
        setClassData(res.data);
      } catch (err) {
        console.error('Error fetching class details:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAnnouncements = async () => {
      try {
        setAnnLoading(true);
        const res = await getClassAnnouncements(classId);
        setAnnouncements(res.data);
      } catch (err) {
        console.error('Error fetching announcements:', err);
      } finally {
        setAnnLoading(false);
      }
    };

    fetchDetails();
    fetchAnnouncements();
  }, [classId]);

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
    });

  if (loading) {
    return (
      <div className='modal-overlay'>
        <div className='modal-content loading'>Loading Details…</div>
      </div>
    );
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content details-modal'>
        <div className='modal-header'>
          <div className='header-title'>
            <BookOpen size={24} className='text-blue' />
            <h2>Class Details</h2>
          </div>
          <button onClick={onClose} className='close-btn' aria-label='Close'>
            <X size={20} />
          </button>
        </div>

        {classData ? (
          <div className='details-body'>
            <div className='detail-item'>
              <label>Course Name</label>
              <p className='detail-value'>{classData.class_name}</p>
            </div>

            <div className='detail-grid'>
              <div className='detail-item'>
                <label><Clock size={16} /> Schedule</label>
                <p>{classData.time_in_pakistan}</p>
              </div>
              <div className='detail-item'>
                <label><Shield size={16} /> Class ID</label>
                <p>#{classData.id}</p>
              </div>
            </div>

            <div className='detail-item mt-4'>
              <label><Calendar size={16} /> Created On</label>
              <p>{formatDate(classData.created_at)}</p>
            </div>

            <div className='detail-item mt-4'>
              <label><User size={16} /> Instructor</label>
              <p className='detail-value'>{classData.teacher_name ?? 'Staff Instructor'}</p>
            </div>

            <div className='detail-announcements'>
              <div className='detail-ann-heading'>
                <Megaphone size={16} />
                <span>Announcements</span>
              </div>

              {annLoading && (
                <div className='detail-ann-loading'>
                  <Loader2 size={18} className='ann-spinner' />
                  <span>Loading…</span>
                </div>
              )}

              {!annLoading && announcements.length === 0 && (
                <p className='detail-ann-empty'>No announcements for this class yet.</p>
              )}

              {!annLoading && announcements.length > 0 && (
                <ul className='detail-ann-list'>
                  {announcements.map((ann) => (
                    <li key={ann.id} className='detail-ann-item'>
                      <div className='detail-ann-item-header'>
                        <strong>{ann.title}</strong>
                        <span className='detail-ann-date'>{formatDate(ann.created_at)}</span>
                      </div>
                      <p>{ann.content}</p>
                      <span className='detail-ann-author'>{ann.teacher_name ?? 'Instructor'}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p>No details found for this class.</p>
        )}

        <div className='modal-footer'>
          <button onClick={onClose} className='btn-secondary full-width'>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsModal;