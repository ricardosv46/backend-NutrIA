# Backend NestJS con MySQL2

Backend simple con NestJS que expone un endpoint GET para obtener todos los productos.

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=pc2
DB_PORT=3306
PORT=3000
```

## Ejecutar

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Endpoints

- `GET /producto` - Obtiene todos los productos (SELECT \* FROM producto)
