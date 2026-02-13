import api from './axiosConfig';

export const getStudents = (params) => {
  return api.get('/api/students', { params });
};

export const createStudent = (data) => {
  return api.post('/api/students', data);
};

export const updateStudent = (id, data) => {
  return api.put(`/api/students/${id}`, data);
};

export const deleteStudent = (id) => {
  return api.delete(`/api/students/${id}`);
};
export const getStudentById = (id) => {
  return api.get(`/${id}`);
};

export const getStudentClasses = (id) => {
  return api.get(`/${id}/classes`);
};
