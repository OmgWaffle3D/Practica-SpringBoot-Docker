import type { Alumno } from '../lib/api';

interface AlumnosListProps {
  alumnos: Alumno[];
  onEdit: (alumno: Alumno) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export default function AlumnosList({ alumnos, onEdit, onDelete, loading = false }: AlumnosListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (alumnos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No se encontraron alumnos</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {alumnos.map((alumno) => (
            <tr key={alumno.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alumno.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumno.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  alumno.grupo === 'A' ? 'bg-green-100 text-green-800' :
                  alumno.grupo === 'B' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  Grupo {alumno.grupo}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alumno.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {alumno.edad} años
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(alumno)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(alumno.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}