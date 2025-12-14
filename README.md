# Backend NestJS - Nutrition App

Backend desarrollado con NestJS y PostgreSQL para aplicación de nutrición y seguimiento de planes alimentarios semanales.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **pnpm** (gestor de paquetes)
- **PostgreSQL 15+** o **Docker Desktop** (para usar la base de datos en contenedor)

## 🚀 Instalación

### 1. Clonar e instalar dependencias

```bash
# Instalar dependencias
pnpm install
```

## 🗄️ Configuración de Base de Datos

Tienes **2 opciones** para configurar PostgreSQL:

### Opción 1: Usar Docker (Recomendado para desarrollo)

Esta es la forma más sencilla y recomendada para desarrollo local.

#### 1.1. Iniciar PostgreSQL con Docker Compose

```bash
# Iniciar contenedores de PostgreSQL y pgAdmin
docker-compose up -d

# Verificar que los contenedores estén corriendo
docker-compose ps
```

Esto iniciará:

- **PostgreSQL** en el puerto `5432`
- **pgAdmin** (interfaz web) en `http://localhost:5050`

**Credenciales por defecto de PostgreSQL:**

- Usuario: `postgres`
- Contraseña: `postgres`
- Base de datos: `nutrition_app`
- Puerto: `5432`

**Credenciales de pgAdmin:**

- Email: `admin@admin.com`
- Contraseña: `admin`

#### 1.2. Detener contenedores

```bash
# Detener contenedores
docker-compose down

# Detener y eliminar volúmenes (⚠️ Esto borra todos los datos)
docker-compose down -v
```

### Opción 2: PostgreSQL Local

Si prefieres usar una instalación local de PostgreSQL:

#### 2.1. Instalar PostgreSQL

- **Windows**: Descarga desde [postgresql.org](https://www.postgresql.org/download/windows/)
- **macOS**: `brew install postgresql@15`
- **Linux**: `sudo apt-get install postgresql-15`

#### 2.2. Crear base de datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE nutrition_app;

# Salir
\q
```

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# ============================================
# Configuración del Servidor
# ============================================
PORT=3000
API_URL=http://localhost:3000

# ============================================
# Configuración de Base de Datos
# ============================================
# Para Docker (Opción 1):
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=nutrition_app

# Para PostgreSQL Local (Opción 2):
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USER=tu_usuario_postgres
# DATABASE_PASSWORD=tu_contraseña_postgres
# DATABASE_NAME=nutrition_app

# SSL para conexión de base de datos (true/false)
# Para desarrollo local normalmente false, para producción puede ser true
DATABASE_SSL=false

# ============================================
# Configuración JWT
# ============================================
JWT_SECRET=tu_secret_key_super_segura_cambiar_en_produccion
```

⚠️ **IMPORTANTE**:

- Nunca commits el archivo `.env` al repositorio (ya está en `.gitignore`)
- En producción, usa variables de entorno seguras y cambia `JWT_SECRET` por una clave fuerte

## 📊 Configuración de la Base de Datos

Una vez que PostgreSQL esté corriendo (Docker o local), tienes **2 opciones** para crear las tablas:

### Opción A: Script SQL Manual (Rápido)

Si prefieres ejecutar el script SQL directamente:

```bash
# Conectar a PostgreSQL y ejecutar el script
psql -U postgres -d nutrition_app -f src/database/scripts/create_database.sql

# O si estás usando Docker:
docker exec -i nutrition_postgres psql -U postgres -d nutrition_app < src/database/scripts/create_database.sql
```

⚠️ **Nota**: El script crea una base de datos llamada `nutrition_app_yi8r`. Si necesitas otro nombre, modifica el script antes de ejecutarlo.

### Opción B: Migraciones TypeORM (Recomendado)

Esta es la forma más profesional y mantiene el historial de cambios:

```bash
# Compilar el proyecto primero (las migraciones necesitan los archivos compilados)
pnpm run build

# Ejecutar migraciones
pnpm run migration:run

# Si necesitas revertir la última migración
pnpm run migration:revert

# Generar una nueva migración (después de cambiar entidades)
pnpm run migration:generate -- src/database/migrations/NombreMigracion
```

## 🌱 Poblar Base de Datos con Datos de Ejemplo

Para insertar comidas de ejemplo (seed):

```bash
# Ejecutar seed de comidas
pnpm run seed:meals
```

## 🏃 Ejecutar el Proyecto

```bash
# Modo desarrollo (con hot-reload)
pnpm run start:dev

# Modo producción
pnpm run build
pnpm run start:prod

# Modo debug
pnpm run start:debug
```

El servidor estará disponible en: `http://localhost:3000`

## 📚 Documentación API (Swagger)

Una vez que el servidor esté corriendo, accede a la documentación interactiva:

```
http://localhost:3000/api/docs
```

La documentación Swagger incluye:

- Descripción de todos los endpoints
- Esquemas de request/response
- Posibilidad de probar endpoints directamente
- Autenticación JWT

## 🔑 Endpoints Principales

### Autenticación

- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión
- `POST /auth/logout` - Cerrar sesión

### Usuarios

- `GET /users/profile` - Obtener perfil del usuario autenticado
- `PUT /users/profile` - Actualizar perfil del usuario

### Comidas

- `GET /meals` - Obtener todas las comidas
- `GET /meals/weekly-plan` - Obtener plan semanal del usuario

### Más detalles

Consulta la documentación Swagger en `/api/docs` para ver todos los endpoints disponibles.

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
pnpm run start:dev          # Iniciar en modo desarrollo
pnpm run start:debug        # Iniciar en modo debug

# Producción
pnpm run build              # Compilar TypeScript
pnpm run start:prod         # Ejecutar versión compilada

# Migraciones
pnpm run migration:generate # Generar nueva migración
pnpm run migration:run      # Ejecutar migraciones pendientes
pnpm run migration:revert   # Revertir última migración

# Seeds
pnpm run seed:meals         # Poblar comidas de ejemplo

# Calidad de Código
pnpm run lint               # Ejecutar ESLint
pnpm run format             # Formatear código con Prettier

# Testing
pnpm run test               # Ejecutar tests unitarios
pnpm run test:e2e           # Ejecutar tests end-to-end
pnpm run test:cov           # Generar cobertura de tests
```

## 📁 Estructura del Proyecto

```
back/
├── src/
│   ├── auth/              # Módulo de autenticación (JWT)
│   ├── users/             # Módulo de usuarios
│   ├── meals/             # Módulo de comidas y planes semanales
│   ├── common/            # Código compartido (enums, etc.)
│   ├── database/
│   │   ├── migrations/    # Migraciones TypeORM
│   │   ├── scripts/       # Scripts SQL manuales
│   │   │   ├── create_database.sql
│   │   │   └── drop_database.sql
│   │   └── seeds/         # Datos de ejemplo
│   ├── app.module.ts      # Módulo principal
│   └── main.ts            # Punto de entrada
├── docker-compose.yml     # Configuración Docker para PostgreSQL
├── .env                   # Variables de entorno (crear manualmente)
└── package.json
```

## 🔒 Seguridad

- Las contraseñas se hashean con `bcrypt` antes de guardarse
- Autenticación JWT implementada
- Validación de datos con `class-validator`
- CORS habilitado
- Nunca se exponen contraseñas en respuestas

## ⚠️ Solución de Problemas

### Error: "Cannot connect to database"

1. Verifica que PostgreSQL esté corriendo:

   ```bash
   # Si usas Docker:
   docker-compose ps

   # Si usas PostgreSQL local:
   psql -U postgres -c "SELECT version();"
   ```

2. Verifica las variables de entorno en `.env`

3. Verifica que el puerto `5432` no esté ocupado por otro proceso

### Error: "relation does not exist"

Ejecuta las migraciones o el script SQL para crear las tablas:

```bash
pnpm run migration:run
# O
psql -U postgres -d nutrition_app -f src/database/scripts/create_database.sql
```

### Error: SSL connection required

Si estás usando una conexión local sin SSL, configura `DATABASE_SSL=false` en tu archivo `.env`. En producción, establece `DATABASE_SSL=true` si tu proveedor lo requiere.

## 📝 Notas Adicionales

- El proyecto usa **pnpm** como gestor de paquetes (no npm)
- Las migraciones se ejecutan contra los archivos compilados (`dist/`), por lo que siempre ejecuta `pnpm run build` antes de `migration:run`
- El script SQL manual crea una base de datos llamada `nutrition_app_yi8r` - ajusta según necesites
- pgAdmin está disponible en `http://localhost:5050` si usas Docker

## 🤝 Contribuir

1. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
2. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
3. Push a la rama (`git push origin feature/AmazingFeature`)
4. Abre un Pull Request

## 📄 Licencia

MIT
