import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/students';

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

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
