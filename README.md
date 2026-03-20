# 🛒 Products API — Job Simulator

API REST CRUD completa para gestión de productos, construida con **Node.js + Express + PostgreSQL**, totalmente containerizada con Docker. Proyecto entregado a **nivel Senior** con integración full stack y personalización del frontend.

---

## 📋 Tabla de contenido

- [Descripción general](#descripción-general)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [Esquema de base de datos](#esquema-de-base-de-datos)
- [Endpoints de la API](#endpoints-de-la-api)
- [Ejemplos de uso](#ejemplos-de-uso)
- [Niveles de contratación](#niveles-de-contratación)
- [Bonus implementados](#bonus-implementados)

---

## Descripción general

Sistema CRUD completo para el recurso **Products** (productos). Expone una API REST consumida por un cliente frontend provisto. La API cumple el contrato definido por el simulador: campos tipados, validaciones, códigos HTTP estándar y persistencia relacional.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Runtime | Node.js 20 (ES Modules) |
| Framework | Express 4 |
| Base de datos | PostgreSQL |
| Driver DB | `pg` (node-postgres) |
| CORS | `cors` |
| Containerización | Docker + Docker Compose |
| Frontend | Nginx (Alpine) |

---

## Estructura del proyecto

```
job-simulator/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── server.js              # Punto de entrada, arranque del servidor
│       ├── app.js                 # Configuración de Express y middlewares
│       ├── config/
│       │   └── db.js              # Conexión a PostgreSQL con reintentos
│       ├── controllers/
│       │   └── product.controllers.js  # Lógica HTTP de cada endpoint
│       ├── models/
│       │   └── product.model.js   # Queries SQL
│       └── routes/
│           └── product.routes.js  # Definición de rutas
├── frontend/
│   ├── Dockerfile                 # Imagen Nginx
│   ├── nginx.conf                 # Configuración del servidor web
│   ├── docker-compose.yml.example
│   └── public/                    # Archivos estáticos del cliente
├── resources/
│   └── init.sql                   # Script de inicialización del esquema + seed data
├── docker-compose.yml             # Orquestación completa (API + DB + Frontend)
├── .env.example                   # Variables de entorno documentadas
└── .gitignore
```

---

## Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) ≥ 20
- [Docker Compose](https://docs.docker.com/compose/) ≥ 2 (incluido en Docker Desktop)

No se requiere Node.js ni PostgreSQL instalados localmente.

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/JonathanTubac/job-simulator.git
cd job-simulator
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` si necesitas cambiar valores (opcional; los valores del ejemplo funcionan por defecto).

### 3. Levantar el sistema completo

```bash
docker-compose up --build
```

Esto levanta tres servicios en orden:

| Servicio | Puerto local | Descripción |
|----------|-------------|-------------|
| `db` | 5432 | PostgreSQL con esquema e inicialización automática |
| `api` | 3000 | REST API (espera a que la DB esté lista) |
| `frontend` | 8088 | Cliente web (Nginx) |

> La API no arranca hasta que PostgreSQL acepta conexiones. No se requiere intervención manual.

### 4. Verificar que todo está corriendo

```bash
# Health check de la API
curl http://localhost:3000/products

# Abrir el frontend en el navegador
open http://localhost:8088
```

---

## Variables de entorno

Copia `.env.example` como `.env` y ajusta según tu entorno:

```env
# Base de datos
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
DB_DATABASE=productsdb

# API
PORT=3000
```

> ⚠️ Nunca versiones el archivo `.env`. Está incluido en `.gitignore`.

---

## Esquema de base de datos

La tabla `products` se crea automáticamente al primer arranque mediante `resources/init.sql`:

```sql
CREATE TABLE IF NOT EXISTS products (
    id       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,   -- campo1: string, requerido
    category VARCHAR(100) NOT NULL,   -- campo2: string, requerido
    brand    VARCHAR(100) NOT NULL,   -- campo3: string, requerido
    stock    INTEGER NOT NULL,        -- campo4: integer, requerido
    price    REAL NOT NULL,           -- campo5: float, requerido
    available BOOLEAN NOT NULL        -- campo6: boolean, requerido
);
```

El script también inserta 25 registros de ejemplo para demostración.

---

## Endpoints de la API

Base URL: `http://localhost:3000`

| Método | Ruta | Descripción | Código éxito |
|--------|------|-------------|-------------|
| `GET` | `/products` | Listar todos los productos | `200 OK` |
| `GET` | `/products/:id` | Obtener un producto por ID | `200 OK` |
| `POST` | `/products` | Crear un nuevo producto | `201 Created` |
| `PUT` | `/products/:id` | Actualizar un producto completo | `200 OK` |
| `PATCH` | `/products/:id` | Actualizar campos parciales | `200 OK` |
| `DELETE` | `/products/:id` | Eliminar un producto | `200 OK` |

### Estructura del recurso

```json
{
  "id":        1,
  "name":      "MacBook Air M1",
  "category":  "Electronics",
  "brand":     "Apple",
  "stock":     5,
  "price":     9500.99,
  "available": true
}
```

| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `id` | integer | — | Auto-generado |
| `name` | string | ✅ | Nombre del producto |
| `category` | string | ✅ | Categoría |
| `brand` | string | ✅ | Marca |
| `stock` | integer | ✅ | Cantidad en inventario |
| `price` | float | ✅ | Precio decimal |
| `available` | boolean | ✅ | Disponibilidad |

---

## Ejemplos de uso

### Listar todos los productos

```bash
curl http://localhost:3000/products
```

### Obtener un producto por ID

```bash
curl http://localhost:3000/products/1
```

### Crear un producto

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "RTX 4090",
    "category": "Electronics",
    "brand": "NVIDIA",
    "stock": 3,
    "price": 15999.99,
    "available": true
  }'
```

### Actualización completa (PUT)

```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "RTX 4090 Ti",
    "category": "Electronics",
    "brand": "NVIDIA",
    "stock": 2,
    "price": 17999.99,
    "available": false
  }'
```

### Actualización parcial (PATCH)

```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 13999.99,
    "available": true
  }'
```

Solo los campos enviados son modificados; el resto permanece sin cambios.

### Eliminar un producto

```bash
curl -X DELETE http://localhost:3000/products/1
```

### Códigos de error

| Código | Situación |
|--------|-----------|
| `500 Internal Server Error` | Error interno del servidor o DB |

---

## Niveles de contratación

Este proyecto fue entregado a **Nivel 3 — Senior**, cumpliendo todos los requisitos acumulados:

### ✅ Nivel 1 — Junior
- Los cinco endpoints funcionan correctamente contra la base de datos
- Validaciones implementadas con los tipos de datos correctos
- Persistencia de datos entre operaciones
- `Dockerfile` y `docker-compose.yml` presentes y funcionales

### ✅ Nivel 2 — Mid
- Base de datos PostgreSQL en servicio separado
- Variables de entorno para toda la configuración (sin hardcoding)
- Manejo de errores de conexión a la base de datos
- La API no arranca hasta que PostgreSQL esté disponible (reintentos automáticos)

### ✅ Nivel 3 — Senior
- Endpoint `PATCH` para actualizaciones parciales
- `.env.example` documentado en el repositorio
- `.gitignore` configurado correctamente
- Script SQL de inicialización ejecutado automáticamente al primer arranque
- Separación clara de responsabilidades: `config/`, `routes/`, `controllers/`, `models/`
- Historial de commits incremental

---

## Bonus implementados

### ✅ Integración full stack (+10 puntos)

El `docker-compose.yml` principal incluye los tres servicios (API, base de datos y frontend). Un único `docker-compose up` levanta el sistema completo. El frontend consume la API sin configuración adicional.

### ✅ Personalización del frontend (+5 puntos)

El frontend muestra los nombres reales del dominio (`name`, `category`, `brand`, `stock`, `price`, `available`) en lugar de `campo1`, `campo2`, etc. Los cambios son coherentes con el recurso `products` implementado en la API.

---

## Desarrollo local (sin Docker)

Si deseas correr solo el backend localmente para desarrollo:

```bash
cd backend
npm install
# Configura las variables de entorno apuntando a tu PostgreSQL local
node src/server.js
```

---

## Licencia

MIT