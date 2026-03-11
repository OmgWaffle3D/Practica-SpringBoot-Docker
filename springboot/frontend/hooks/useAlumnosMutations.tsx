import { useState } from 'react';
import type { Alumno, CreateAlumnoRequest } from '../lib/api';
import { api } from '../lib/api';

export const useAlumnosMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAlumno = async (alumnoData: CreateAlumnoRequest): Promise<Alumno | null> => {
    try {
      setLoading(true);
      setError(null);
      const newAlumno = await api.createAlumno(alumnoData);
      return newAlumno;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating alumno');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateAlumno = async (id: number, alumnoData: CreateAlumnoRequest): Promise<Alumno | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedAlumno = await api.updateAlumno(id, alumnoData);
      return updatedAlumno;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating alumno');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteAlumno = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await api.deleteAlumno(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting alumno');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createAlumno,
    updateAlumno,
    deleteAlumno,
    loading,
    error,
  };
};