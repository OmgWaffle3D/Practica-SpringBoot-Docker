# Dockerfile para Spring Boot + React + TypeScript
# Stage 1: Build stage - Compilar frontend y backend
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Instalar Node.js y npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Copiar archivos de configuración primero (para cache de Docker)
COPY springboot/backend/pom.xml ./springboot/backend/
COPY springboot/package*.json ./springboot/

# Instalar dependencias NPM
RUN cd /app/springboot && npm install

# Copiar código fuente completo
COPY springboot ./springboot

# Compilar frontend
RUN cd /app/springboot && npm run build

# Copiar frontend compilado a recursos estáticos de Spring Boot
RUN mkdir -p /app/springboot/backend/src/main/resources/static
RUN if [ -d "/app/springboot/dist" ]; then cp -r /app/springboot/dist/* /app/springboot/backend/src/main/resources/static/; fi

# Compilar backend con Maven
RUN cd /app/springboot/backend && mvn clean package -DskipTests

# Stage 2: Runtime stage - Solo JRE y JAR final
FROM eclipse-temurin:17-jre

WORKDIR /app

# Crear directorio para datos persistentes
RUN mkdir -p /app/data

# Copiar JAR compilado desde build stage
COPY --from=build /app/springboot/backend/target/*.jar app.jar

# Exponer puerto 8080
EXPOSE 8080

# Variables de entorno
ENV APP_DATA_PATH=/app/data

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]