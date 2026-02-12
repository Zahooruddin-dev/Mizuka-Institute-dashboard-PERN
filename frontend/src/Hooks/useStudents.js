import { useState, useEffect, useCallback } from 'react';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../api/api';

export function useStudents(searchTerm, sortOrder, page, limit) {
  const [students, setStudents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    const response = await getStudents({
      name: searchTerm,
      sort: sortOrder,
      page,
      limit,
    });

    setStudents(response.data.student);
    setTotalCount(response.data.totalCount);
    setLoading(false);
  }, [searchTerm, sortOrder, page, limit]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students,
    totalCount,
    loading,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
}
