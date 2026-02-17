import React, { useEffect, useState } from 'react';
import { getTeacherClasses } from '../../../api/api';
import { BookOpen, Plus } from 'lucide-react';

const TeacherClasses = ({ currentUserId }) => {
  const [myClasses, setMyClasses] = useState([]);

  useEffect(() => {
    const fetchMyClasses = async () => {
      const response = await getTeacherClasses(currentUserId);
      setMyClasses(response.data);
    };
    fetchMyClasses();
  }, [currentUserId]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Managed Classes</h1>
        <button className="add-class-btn"><Plus size={20} /> New Class</button>
      </div>
      
      <div className="classes-grid">
        {myClasses.map(item => (
          <div key={item.id} className="class-card">
             <h3>{item.class_name}</h3>
             <p>Students Enrolled: {item.student_count || 0}</p>
             <button className="view-btn">Manage Class</button>
          </div>
        ))}
      </div>
    </div>
  );
};