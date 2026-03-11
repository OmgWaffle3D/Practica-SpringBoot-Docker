import { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import AlumnosList from '../components/AlumnosList';
import AlumnoForm from '../components/AlumnosDetails';
import { useAlumnos } from '../hooks/useAlumnos';
import { useAlumnosMutations } from '../hooks/useAlumnosMutations';
import { Alumno, CreateAlumnoRequest } from '../lib/api';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAlumno, setEditingAlumno] = useState<Alumno | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  
  const { alumnos, loading, error, refetch } = useAlumnos();
  const { createAlumno, updateAlumno, deleteAlumno, loading: mutationLoading, error: mutationError } = useAlumnosMutations();

  // Filter alumnos based on search term
  const filteredAlumnos = useMemo(() => {
    if (!searchTerm) return alumnos;
    
    return alumnos.filter(alumno => 
      alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumno.grupo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [alumnos, searchTerm]);

  const handleSaveAlumno = async (alumnoData: CreateAlumnoRequest) => {
    try {
      if (editingAlumno) {
        await updateAlumno(editingAlumno.id, alumnoData);
      } else {
        await createAlumno(alumnoData);
      }
      await refetch();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving alumno:', error);
    }
  };

  const handleEditAlumno = (alumno: Alumno) => {
    setEditingAlumno(alumno);
    setShowForm(true);
  };

  const handleDeleteAlumno = async (id: number) => {
    const success = await deleteAlumno(id);
    if (success) {
      await refetch();
    }
    setShowDeleteConfirm(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAlumno(null);
  };

  const handleAddNew = () => {
    setEditingAlumno(null);
    setShowForm(true);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <button 
                onClick={refetch}
                className="mt-2 bg-red-100 border border-red-300 rounded-md px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Gestión de Alumnos</h1>
          <p className="mt-2 text-sm text-gray-600">Administra los alumnos registrados en el sistema</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-lg">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Buscar por nombre o grupo..."
            />
          </div>
          <button
            onClick={handleAddNew}
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agregar Alumno
          </button>
        </div>

        {/* Error message for mutations */}
        {mutationError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-700">{mutationError}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Alumnos</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{alumnos.length}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Resultados de Búsqueda</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{filteredAlumnos.length}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Grupos Activos</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {new Set(alumnos.map(a => a.grupo)).size}
              </dd>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <AlumnosList 
              alumnos={filteredAlumnos}
              onEdit={handleEditAlumno}
              onDelete={(id) => setShowDeleteConfirm(id)}
              loading={loading}
            />
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <AlumnoForm
            alumno={editingAlumno}
            onSave={handleSaveAlumno}
            onCancel={handleCloseForm}
            loading={mutationLoading}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar Eliminación</h3>
              <p className="text-sm text-gray-500 mb-4">
                ¿Estás seguro de que quieres eliminar este alumno? Esta acción no se puede deshacer.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleDeleteAlumno(showDeleteConfirm)}
                  disabled={mutationLoading}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {mutationLoading ? 'Eliminando...' : 'Eliminar'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  disabled={mutationLoading}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
