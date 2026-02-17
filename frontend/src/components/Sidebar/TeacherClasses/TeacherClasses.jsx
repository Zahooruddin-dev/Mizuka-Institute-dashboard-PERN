import React, { useEffect, useState } from 'react';
import { getMyClasses } from '../../../api/api';
import { 
  BookOpen, Clock, Users, Megaphone, 
  Settings2, Trash2, Plus 
} from 'lucide-react';
import CreateClassModal from '../Classes/CreateClassModal';
import '../../../css/TeacherDashboard.css'; 

const TeacherClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMyClasses = async () => {
    try {
      const res = await getMyClasses();
      setClasses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyClasses();
  }, []);

  if (loading) return <div className="loading-text">Loading your dashboard...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-info">
          <h1>Your Managed Classes</h1>
          <p>Manage curriculum, announcements, and student rosters.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="create-btn"
        >
          <Plus size={20} />
          <span>Create New Class</span>
        </button>
      </header>

      <div className="dashboard-grid">
        {classes.length > 0 ? (
          classes.map((c) => (
            <div key={c.id} className="teacher-class-card">
              <div className="card-top">
                <div className="icon-wrapper">
                  <BookOpen size={24} />
                </div>
                <div className="card-actions">
                  <button className="action-icon edit" title="Settings"><Settings2 size={18} /></button>
                  <button className="action-icon delete" title="Delete"><Trash2 size={18} /></button>
                </div>
              </div>

              <h3 className="class-title">{c.class_name}</h3>
              
              <div className="class-meta">
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{c.time_in_pakistan}:00 PKT</span>
                </div>
                <div className="meta-item">
                  <Users size={16} />
                  <span>{c.student_count || 0} Students</span>
                </div>
              </div>

              <div className="card-buttons">
                <button className="btn-roster">
                  <Users size={16} /> Roster
                </button>
                <button className="btn-post">
                  <Megaphone size={16} /> Post
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-dashboard">
            <BookOpen size={48} />
            <p>You haven't created any classes yet.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <CreateClassModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            setIsModalOpen(false);
            fetchMyClasses();
          }} 
        />
      )}
    </div>
  );
};

export default TeacherClasses;