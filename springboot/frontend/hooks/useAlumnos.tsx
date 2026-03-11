import { useState, useEffect } from 'react';
import { Alumno, api } from '../lib/api';

export const useAlumnos = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlumnos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAlumnos();
      setAlumnos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  return {
    alumnos,
    loading,
    error,
    refetch: fetchAlumnos,
  };
};