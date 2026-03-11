export interface Alumno {
  id: number;
  nombre: string;
  grupo: string;
}

export interface CreateAlumnoRequest {
  nombre: string;
  grupo: string;
}

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  // Get all alumnos
  async getAlumnos(): Promise<Alumno[]> {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) {
      throw new Error('Error fetching alumnos');
    }
    return response.json();
  },

  // Create a new alumno
  async createAlumno(alumno: CreateAlumnoRequest): Promise<Alumno> {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alumno),
    });
    if (!response.ok) {
      throw new Error('Error creating alumno');
    }
    return response.json();
  },

  // Update an alumno
  async updateAlumno(id: number, alumno: CreateAlumnoRequest): Promise<Alumno> {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alumno),
    });
    if (!response.ok) {
      throw new Error('Error updating alumno');
    }
    return response.json();
  },

  // Delete an alumno
  async deleteAlumno(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting alumno');
    }
  },
};