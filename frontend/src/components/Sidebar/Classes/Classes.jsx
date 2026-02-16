import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Plus, Search } from 'lucide-react';
import { getClasses } from '../../../api/api';
import CreateClassModal from './CreateClassModal';
import '../../../css/Classes.css';

const Classes = ({ currentUser }) => {
  const [classList, setClassList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await getClasses();
      setClassList(response.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const filteredClasses = classList.filter(c => 
    c.class_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="classes-page">
      <div className="page-header">
        <div className="header-text">
          <h1>Class Directory</h1>
          <p>Explore and manage available courses</p>
        </div>

        {currentUser?.role === 'teacher' && (
          <button className="add-class-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} />
            <span>Create Class</span>
          </button>
        )}
      </div>

      <div className="search-bar-container">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Search for a class..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading-state">Loading classes...</div>
      ) : (
        <div className="classes-grid">
          {filteredClasses.map((item) => (
            <div key={item.id} className="class-card">
              <div className="card-icon">
                <BookOpen size={24} />
              </div>
              <div className="card-content">
                <h3>{item.class_name}</h3>
                <div className="class-info">
                  <Clock size={16} />
                  <span>{item.time_in_pakistan}</span>
                </div>
              </div>
              <div className="card-footer">
                <button className="view-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <CreateClassModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => {
            setIsModalOpen(false);
            fetchClasses(); 
          }} 
        />
      )}
    </div>
  );
};

export default Classes;