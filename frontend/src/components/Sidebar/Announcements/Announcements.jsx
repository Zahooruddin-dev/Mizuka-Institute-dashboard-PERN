import React, { useEffect, useState } from 'react';
import { Megaphone, Calendar, BookOpen, User, Loader2 } from 'lucide-react';
import { getClasses, getClassAnnouncements } from '../../../api/api';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const classesRes = await getClasses();
        const classList = classesRes.data;
        const allAnnouncementsPromises = classList.map(async (c) => {
          const annRes = await getClassAnnouncements(c.id);
          return annRes.data.map(ann => ({ ...ann, class_name: c.class_name }));
        });
        const results = await Promise.all(allAnnouncementsPromises);
        const flatList = results.flat().sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setAnnouncements(flatList);
      } catch (err) {
        console.error("Error loading announcements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <Megaphone size={32} className="page-icon" />
        <div>
          <h1 className="page-heading">Class Announcements</h1>
          <p className="page-description">Recent updates from across the platform</p>
        </div>
      </div>

      <div className="announcements-list">
        {loading ? (
          <div className="placeholder-content">
            <Loader2 className="animate-spin" />
            <p>Fetching class updates...</p>
          </div>
        ) : announcements.length > 0 ? (
          announcements.map((ann) => (
            <div key={ann.id} className="announcement-card">
              <div className="ann-header">
                <span className="class-badge">
                  <BookOpen size={14} /> {ann.class_name}
                </span>
                <span className="ann-date">
                  <Calendar size={14} /> 
                  {new Date(ann.created_at).toLocaleDateString()}
                </span>
              </div>
              <h2 className="ann-title">{ann.title}</h2>
              <p className="ann-content">{ann.content}</p>
              <div className="ann-footer">
                <User size={14} /> 
                <span>Instructor ID: {ann.teacher_id}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="placeholder-content">
            <p>No announcements found for any classes yet.</p>
          </div>
        )}
      </div>

      <style>{`
        /* Reuse your existing CSS here */
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Announcements;