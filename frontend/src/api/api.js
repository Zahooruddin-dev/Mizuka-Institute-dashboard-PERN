import api from './axiosConfig';

export const getStudents = (params) => {
	return api.get('/', { params });
};

export const createStudent = (data) => {
	return api.post('/', data);
};

export const updateStudent = (id, data) => {
	return api.put(`/${id}`, data);
};

export const deleteStudent = (id) => {
	return api.delete(`/${id}`);
};
