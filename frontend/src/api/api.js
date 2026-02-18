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
	return api.get(`/api/students/${id}`);
};

export const getStudentClasses = (id) => {
	return api.get(`/${id}/classes`);
};

export const createClass = (data) => {
	return api.post('/api/class', data);
};
export const getClasses = (params) => {
	return api.get('/api/class', { params });
};
export const getClassById = (id) => {
	return api.get(`/api/class/${id}`);
};
export const postEnrollement = (data) => {
	return api.post(`/api/enroll/`, data);
};
export const getClassEnrolledRooster = (id) => {
	return api.get(`/api/enroll/class/${id}`);
};
export const getStudentEnrolledShedule = (id) => {
	return api.get(`/api/enroll/class/${id}`);
};
export const getMyClasses = () => {
	return api.get('/api/class/mine');
};
export const postAnnouncement = (id, data) => {
	return api.post(`/api/class/${id}/announcements`, data);
};
export const getClassAnnouncements = (classId) =>
	api.get(`/api/class/${classId}/announcements`);
export const getMyAnnouncements = () => api.get('/api/announcements/my-feed');

