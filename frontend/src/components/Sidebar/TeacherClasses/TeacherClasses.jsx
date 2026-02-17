import React, { useEffect, useState } from 'react';
import { getMyClasses } from '../../../api/api';
import { BookOpen, Users, Clock } from 'lucide-react';

const TeacherClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyClasses()
      .then(res => setClasses(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading your classes...</div>;

  return (
    <div className="teacher-classes-page p-6">
      <h1 className="text-2xl font-bold mb-6">Classes You Manage</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((c) => (
          <div key={c.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <BookOpen size={24} />
              </div>
              <h3 className="font-bold text-lg">{c.class_name}</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock size={16} /> <span>{c.time_in_pakistan}:00 PKT</span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-gray-50 hover:bg-indigo-50 text-indigo-600 rounded-lg font-medium transition-colors">
              Manage Roster
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherClasses;