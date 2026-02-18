import React, { useEffect, useState } from 'react';
import { getMyClasses, getClassAnnouncements } from '../../../api/api';
import {
  BookOpen, Clock, Users, Megaphone, Settings2, Trash2,
  Plus, AlertCircle, ChevronDown, ChevronUp, Calendar, User,
} from 'lucide-react';
import CreateClassModal from '../Classes/CreateClassModal';
import CreateAnnouncementModal from './CreateAnnouncementModal';
import '../../../css/TeacherClasses.css';

const TeacherClasses = () => {
  const [classes,             setClasses]             = useState([]);
  const [loading,             setLoading]             = useState(true);
  const [error,               setError]               = useState(null);
  const [isModalOpen,         setIsModalOpen]         = useState(false);
  const [deleteTarget,        setDeleteTarget]        = useState(null);
  const [announcementTarget,  setAnnouncementTarget]  = useState(null);
  const [expandedClass,       setExpandedClass]       = useState(null);
  const [classAnnouncements,  setClassAnnouncements]  = useState({});
  const [annLoading,          setAnnLoading]          = useState({});
  const [annDeleteTarget,     setAnnDeleteTarget]     = useState(null);

  const fetchMyClasses = async () => {
    try {
      setError(null);
      const res = await getMyClasses();
      setClasses(res.data);
    } catch {
      setError('Failed to load classes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyClasses();
  }, []);

  const toggleAnnouncements = async (classId) => {
    if (expandedClass === classId) {
      setExpandedClass(null);
      return;
    }

    setExpandedClass(classId);

    if (classAnnouncements[classId]) return;

    setAnnLoading((prev) => ({ ...prev, [classId]: true }));
    try {
      const res = await getClassAnnouncements(classId);
      setClassAnnouncements((prev) => ({ ...prev, [classId]: res.data }));
    } catch {
      setClassAnnouncements((prev) => ({ ...prev, [classId]: [] }));
    } finally {
      setAnnLoading((prev) => ({ ...prev, [classId]: false }));
    }
  };

  const handleAnnouncementPosted = (classId) => {
    setAnnouncementTarget(null);
    setClassAnnouncements((prev) => ({ ...prev, [classId]: undefined }));
    if (expandedClass === classId) {
      setExpandedClass(null);
      setTimeout(() => toggleAnnouncements(classId), 50);
    }
  };

  const handleCardKey = (e, id) => {
    if (e.key === 'Enter') window.location.href = `/teacher/class/${id}`;
  };

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <main className='dashboard-container' aria-labelledby='teacher-classes-heading'>
      <header className='dashboard-header'>
        <div className='header-info'>
          <h1 id='teacher-classes-heading'>Your Managed Classes</h1>
          <p>Manage curriculum, announcements, and student rosters.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className='create-btn' aria-label='Create new class'>
          <Plus size={20} />
          <span>Create New Class</span>
        </button>
      </header>

      {loading && (
        <section className='dashboard-grid'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='teacher-class-card skeleton-card' />
          ))}
        </section>
      )}

      {error && (
        <div className='error-state' role='alert'>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <section className='dashboard-grid'>
          {classes.length > 0 ? (
            classes.map((c) => (
              <article
                key={c.id}
                className='teacher-class-card clickable'
                tabIndex='0'
                onClick={() => (window.location.href = `/teacher/class/${c.id}`)}
                onKeyDown={(e) => handleCardKey(e, c.id)}
                aria-label={`Open ${c.class_name}`}
              >
                <div className='card-top'>
                  <div className='icon-wrapper'>
                    <BookOpen size={22} />
                  </div>
                  <div className='card-actions'>
                    <button
                      className='action-icon edit'
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Edit ${c.class_name}`}
                    >
                      <Settings2 size={18} />
                    </button>
                    <button
                      className='action-icon delete'
                      onClick={(e) => { e.stopPropagation(); setDeleteTarget(c); }}
                      aria-label={`Delete ${c.class_name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className='class-title'>{c.class_name}</h3>

                <div className='class-meta'>
                  <div className='meta-item'>
                    <Clock size={16} />
                    <span>{c.time_in_pakistan}:00 PKT</span>
                  </div>
                  <div className='meta-item'>
                    <Users size={16} />
                    <span>{c.student_count || 0} Students</span>
                  </div>
                </div>

                <div className='card-buttons'>
                  <button className='btn-roster' onClick={(e) => e.stopPropagation()}>
                    <Users size={16} />
                    Roster
                  </button>
                  <button
                    className='btn-post'
                    onClick={(e) => { e.stopPropagation(); setAnnouncementTarget(c); }}
                  >
                    <Megaphone size={16} />
                    Post
                  </button>
                </div>

                <button
                  className='ann-toggle-btn'
                  onClick={(e) => { e.stopPropagation(); toggleAnnouncements(c.id); }}
                  aria-expanded={expandedClass === c.id}
                >
                  <Megaphone size={14} />
                  <span>Announcements</span>
                  {expandedClass === c.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {expandedClass === c.id && (
                  <div className='ann-panel' onClick={(e) => e.stopPropagation()}>
                    {annLoading[c.id] && (
                      <p className='ann-panel-loading'>Loading…</p>
                    )}

                    {!annLoading[c.id] && classAnnouncements[c.id]?.length === 0 && (
                      <p className='ann-panel-empty'>No announcements yet.</p>
                    )}

                    {!annLoading[c.id] && classAnnouncements[c.id]?.length > 0 && (
                      <ul className='ann-panel-list'>
                        {classAnnouncements[c.id].map((ann) => (
                          <li key={ann.id} className='ann-panel-item'>
                            <div className='ann-panel-item-header'>
                              <strong>{ann.title}</strong>
                              <button
                                className='ann-delete-btn'
                                onClick={() => setAnnDeleteTarget(ann)}
                                aria-label={`Delete announcement "${ann.title}"`}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                            <p>{ann.content}</p>
                            <div className='ann-panel-meta'>
                              <span><User size={12} />{ann.teacher_name ?? 'You'}</span>
                              <span><Calendar size={12} />{formatDate(ann.created_at)}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className='empty-dashboard'>
              <BookOpen size={48} />
              <h3>No Classes Yet</h3>
              <p>You haven't created any classes yet.</p>
              <button onClick={() => setIsModalOpen(true)} className='create-btn small'>
                <Plus size={16} />
                Create Your First Class
              </button>
            </div>
          )}
        </section>
      )}

      {isModalOpen && (
        <CreateClassModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => { setIsModalOpen(false); fetchMyClasses(); }}
        />
      )}

      {announcementTarget && (
        <CreateAnnouncementModal
          classItem={announcementTarget}
          onClose={() => setAnnouncementTarget(null)}
          onSuccess={() => handleAnnouncementPosted(announcementTarget.id)}
        />
      )}

      {deleteTarget && (
        <div className='modal-overlay' role='dialog' aria-modal='true'>
          <div className='confirm-modal'>
            <h3>Delete Class</h3>
            <p>Are you sure you want to delete "{deleteTarget.class_name}"?</p>
            <div className='modal-actions'>
              <button className='btn-secondary' onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className='btn-danger' onClick={() => setDeleteTarget(null)}>Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

      {annDeleteTarget && (
        <div className='modal-overlay' role='dialog' aria-modal='true'>
          <div className='confirm-modal'>
            <h3>Delete Announcement</h3>
            <p>Delete "{annDeleteTarget.title}"? This cannot be undone.</p>
            <div className='modal-actions'>
              <button className='btn-secondary' onClick={() => setAnnDeleteTarget(null)}>Cancel</button>
              <button className='btn-danger' onClick={() => setAnnDeleteTarget(null)}>Confirm Delete</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default TeacherClasses;