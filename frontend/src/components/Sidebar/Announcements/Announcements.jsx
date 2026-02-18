import React, { useEffect, useState } from 'react';
import { Megaphone, Calendar, BookOpen, User, Loader2, AlertCircle } from 'lucide-react';
import { getMyAnnouncements, getClasses, getClassAnnouncements } from '../../../api/api';
import '../../../css/Announcements.css';

const Announcements = ({ userRole }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        setError(null);

        if (userRole === 'student') {
          const res = await getMyAnnouncements();
          setAnnouncements(res.data);
        } else {
          const classesRes = await getClasses();
          const classList  = classesRes.data;

          const settled = await Promise.allSettled(
            classList.map((c) =>
              getClassAnnouncements(c.id).then((r) =>
                r.data.map((ann) => ({ ...ann, class_name: ann.class_name ?? c.class_name }))
              )
            )
          );

          const merged = settled
            .filter((r) => r.status === 'fulfilled')
            .flatMap((r) => r.value)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

          setAnnouncements(merged);
        }
      } catch (err) {
        setError('Failed to load announcements.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [userRole]);

  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
    });

  return (
    <div className='announcements-page'>
      <div className='announcements-page-header'>
        <div className='ann-page-icon'>
          <Megaphone size={24} />
        </div>
        <div>
          <h1>Announcements</h1>
          <p>Recent updates from your enrolled classes</p>
        </div>
      </div>

      {loading && (
        <div className='ann-loading'>
          <Loader2 size={28} className='ann-spinner' />
          <span>Fetching announcements…</span>
        </div>
      )}

      {error && (
        <div className='ann-error' role='alert'>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && announcements.length === 0 && (
        <div className='ann-empty'>
          <Megaphone size={40} />
          <p>No announcements yet.</p>
        </div>
      )}

      {!loading && !error && announcements.length > 0 && (
        <ul className='ann-list'>
          {announcements.map((ann) => (
            <li key={ann.id} className='ann-card'>
              <div className='ann-card-header'>
                <span className='ann-class-badge'>
                  <BookOpen size={13} />
                  {ann.class_name}
                </span>
                <span className='ann-date'>
                  <Calendar size={13} />
                  {formatDate(ann.created_at)}
                </span>
              </div>

              <h2 className='ann-title'>{ann.title}</h2>
              <p className='ann-body'>{ann.content}</p>

              <div className='ann-card-footer'>
                <User size={13} />
                <span>{ann.teacher_name ?? 'Instructor'}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Announcements;