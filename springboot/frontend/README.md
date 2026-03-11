# Frontend - Sistema de Gestión de Alumnos

Esta es la aplicación frontend desarrollada con React + TypeScript + Tailwind CSS para gestionar alumnos.

## Características

- ✅ **Lista de alumnos** con tabla responsiva
- ✅ **Búsqueda en tiempo real** por nombre o grupo
- ✅ **Formulario modal** para agregar/editar alumnos
- ✅ **Confirmación de eliminación** con modal
- ✅ **Estadísticas visuales** (total alumnos, grupos activos)
- ✅ **Estados de carga** y manejo de errores
- ✅ **Diseño responsivo** con Tailwind CSS
- ✅ **Validación de formularios**
- ✅ **CRUD completo** (Crear, Leer, Actualizar, Eliminar)

## Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## API Endpoints

El frontend consume las siguientes API REST:

- `GET /api/items` - Obtener todos los alumnos
- `POST /api/items` - Crear nuevo alumno
- `PUT /api/items/:id` - Actualizar alumno existente
- `DELETE /api/items/:id` - Eliminar alumno

## Modelo de Datos

```typescript
interface Alumno {
  id: number;
  nombre: string;
  grupo: string; // 'A', 'B', 'C'
}
```

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
