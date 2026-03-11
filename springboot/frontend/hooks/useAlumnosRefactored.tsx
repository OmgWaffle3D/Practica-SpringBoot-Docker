import { useState, useEffect, useMemo } from 'react';
import { Alumno, CreateAlumnoRequest } from '../lib/api';
import { useAlumnos } from './useAlumnos';
import { useAlumnosMutations } from './useAlumnosMutations';

export const useAlumnosRefactored = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  
  const { alumnos, loading, error, refetch } = useAlumnos();
  const mutations = useAlumnosMutations();

  // Filtered alumnos with search and group filter
  const filteredAlumnos = useMemo(() => {
    let filtered = alumnos;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(alumno => 
        alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumno.id.toString().includes(searchTerm)
      );
    }
    
    // Apply group filter
    if (selectedGroup) {
      filtered = filtered.filter(alumno => alumno.grupo === selectedGroup);
    }
    
    return filtered;
  }, [alumnos, searchTerm, selectedGroup]);

  // Get unique groups
  const availableGroups = useMemo(() => {
    return [...new Set(alumnos.map(alumno => alumno.grupo))].sort();
  }, [alumnos]);

  // Statistics
  const stats = useMemo(() => {
    const totalAlumnos = alumnos.length;
    const filteredCount = filteredAlumnos.length;
    const groupStats = availableGroups.map(grupo => ({
      grupo,
      count: alumnos.filter(a => a.grupo === grupo).length
    }));

    return {
      total: totalAlumnos,
      filtered: filteredCount,
      groups: groupStats,
      totalGroups: availableGroups.length
    };
  }, [alumnos, filteredAlumnos, availableGroups]);

  // Enhanced mutations with auto-refresh
  const createAlumno = async (alumnoData: CreateAlumnoRequest): Promise<Alumno | null> => {
    const result = await mutations.createAlumno(alumnoData);
    if (result) {
      await refetch();
    }
    return result;
  };

  const updateAlumno = async (id: number, alumnoData: CreateAlumnoRequest): Promise<Alumno | null> => {
    const result = await mutations.updateAlumno(id, alumnoData);
    if (result) {
      await refetch();
    }
    return result;
  };

  const deleteAlumno = async (id: number): Promise<boolean> => {
    const result = await mutations.deleteAlumno(id);
    if (result) {
      await refetch();
    }
    return result;
  };

  // Search and filter functions
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleGroupFilter = (grupo: string) => {
    setSelectedGroup(grupo);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGroup('');
  };

  // Find alumno by ID
  const findAlumnoById = (id: number): Alumno | undefined => {
    return alumnos.find(alumno => alumno.id === id);
  };

  return {
    // Data
    alumnos: filteredAlumnos,
    allAlumnos: alumnos,
    availableGroups,
    stats,
    
    // State
    loading,
    error: error || mutations.error,
    mutationLoading: mutations.loading,
    
    // Filters
    searchTerm,
    selectedGroup,
    handleSearchChange,
    handleGroupFilter,
    clearFilters,
    
    // Actions
    createAlumno,
    updateAlumno,
    deleteAlumno,
    refetch,
    findAlumnoById,
  };
};