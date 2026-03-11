import { useState } from 'react';
import { Alumno, CreateAlumnoRequest } from '../lib/api';

interface AlumnoFormProps {
  alumno?: Alumno | null;
  onSave: (alumnoData: CreateAlumnoRequest) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function AlumnoForm({ alumno, onSave, onCancel, loading = false }: AlumnoFormProps) {
  const [nombre, setNombre] = useState(alumno?.nombre || '');
  const [grupo, setGrupo] = useState(alumno?.grupo || 'A');
  const [errors, setErrors] = useState<{ nombre?: string; grupo?: string }>({});

  const validateForm = () => {
    const newErrors: { nombre?: string; grupo?: string } = {};
    
    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!grupo) {
      newErrors.grupo = 'El grupo es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSave({ nombre: nombre.trim(), grupo });
      if (!alumno) {
        // Reset form if creating new
        setNombre('');
        setGrupo('A');
      }
    } catch (error) {
      console.error('Error saving alumno:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {alumno ? 'Editar Alumno' : 'Agregar Nuevo Alumno'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.nombre ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingresa el nombre del alumno"
              disabled={loading}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="grupo" className="block text-sm font-medium text-gray-700 mb-1">
              Grupo
            </label>
            <select
              id="grupo"
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.grupo ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            >
              <option value="A">Grupo A</option>
              <option value="B">Grupo B</option>
              <option value="C">Grupo C</option>
            </select>
            {errors.grupo && (
              <p className="text-red-500 text-sm mt-1">{errors.grupo}</p>
            )}
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : (alumno ? 'Actualizar' : 'Crear')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}