package com.example.app.model;

public class Alumno {
    private Long id;
    private String nombre;
    private String grupo;
    private String email;
    private int edad;
    
    // Constructor vacío
    public Alumno() {}
    
    // Constructor completo
    public Alumno(Long id, String nombre, String grupo, String email, int edad) {
        this.id = id;
        this.nombre = nombre;
        this.grupo = grupo;
        this.email = email;
        this.edad = edad;
    }
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getGrupo() {
        return grupo;
    }
    
    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public int getEdad() {
        return edad;
    }
    
    public void setEdad(int edad) {
        this.edad = edad;
    }
    
    @Override
    public String toString() {
        return "Alumno{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", grupo='" + grupo + '\'' +
                ", email='" + email + '\'' +
                ", edad=" + edad +
                '}';
    }
}