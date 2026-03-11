package com.example.app.controller;

import com.example.app.model.Alumno;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/alumnos")
@CrossOrigin(origins = "*")
public class AlumnoController {
    
    private List<Alumno> alumnos = new ArrayList<>();
    private Long nextId = 1L;
    
    // Constructor - datos de prueba
    public AlumnoController() {
        // Agregar algunos alumnos de ejemplo
        alumnos.add(new Alumno(nextId++, "Juan Pérez", "Grupo A", "juan@email.com", 20));
        alumnos.add(new Alumno(nextId++, "María García", "Grupo B", "maria@email.com", 22));
        alumnos.add(new Alumno(nextId++, "Carlos López", "Grupo A", "carlos@email.com", 21));
        alumnos.add(new Alumno(nextId++, "Ana Martínez", "Grupo C", "ana@email.com", 19));
        alumnos.add(new Alumno(nextId++, "Luis Rodríguez", "Grupo B", "luis@email.com", 23));
    }
    
    // GET /api/alumnos - Obtener todos los alumnos
    @GetMapping
    public List<Alumno> getAllAlumnos() {
        return alumnos;
    }
    
    // GET /api/alumnos/{id} - Obtener un alumno por ID
    @GetMapping("/{id}")
    public ResponseEntity<Alumno> getAlumnoById(@PathVariable Long id) {
        Optional<Alumno> alumno = alumnos.stream()
                .filter(a -> a.getId().equals(id))
                .findFirst();
        
        return alumno.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // POST /api/alumnos - Crear nuevo alumno
    @PostMapping
    public Alumno createAlumno(@RequestBody Alumno nuevoAlumno) {
        nuevoAlumno.setId(nextId++);
        alumnos.add(nuevoAlumno);
        return nuevoAlumno;
    }
    
    // PUT /api/alumnos/{id} - Actualizar alumno existente
    @PutMapping("/{id}")
    public ResponseEntity<Alumno> updateAlumno(@PathVariable Long id, @RequestBody Alumno alumnoActualizado) {
        for (int i = 0; i < alumnos.size(); i++) {
            Alumno alumno = alumnos.get(i);
            if (alumno.getId().equals(id)) {
                alumnoActualizado.setId(id);
                alumnos.set(i, alumnoActualizado);
                return ResponseEntity.ok(alumnoActualizado);
            }
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE /api/alumnos/{id} - Eliminar alumno
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlumno(@PathVariable Long id) {
        boolean removed = alumnos.removeIf(alumno -> alumno.getId().equals(id));
        
        if (removed) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // GET /api/alumnos/search - Búsqueda de alumnos
    @GetMapping("/search")
    public List<Alumno> searchAlumnos(@RequestParam(required = false) String nombre, 
                                     @RequestParam(required = false) String grupo) {
        return alumnos.stream()
                .filter(alumno -> nombre == null || alumno.getNombre().toLowerCase().contains(nombre.toLowerCase()))
                .filter(alumno -> grupo == null || alumno.getGrupo().toLowerCase().contains(grupo.toLowerCase()))
                .collect(java.util.stream.Collectors.toList());
    }
}