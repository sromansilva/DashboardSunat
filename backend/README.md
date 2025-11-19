# SUNAT Dashboard Backend

Backend REST para el dashboard SUNAT basado en Node.js, Express 5 y Prisma con PostgreSQL (Neon).

## Stack

- Node.js + Express 5 + TypeScript
- Prisma ORM + PostgreSQL (Neon con SSL obligatorio)
- Autenticación JWT (access + refresh) + bcrypt
- Validación con Zod, seguridad con Helmet y CORS granular

## Requisitos previos

- Node.js >= 18
- Cuenta en [Neon](https://neon.tech/) con base PostgreSQL y `sslmode=require`
- `psql` o el editor SQL de Neon para ejecutar scripts

## Paso a paso de ejecución

1. Clonar el repositorio y entrar a `backend/`.
2. Copiar el archivo de variables:
   ```bash
   cp .env.example .env
   ```
3. Editar `.env` con tu `DATABASE_URL` de Neon (usa el pooler con `sslmode=require`), secretos JWT y dominio de CORS.
4. Instalar dependencias:
   ```bash
   npm install
   ```
5. Crear usuario/permisos en la base Neon (opcional pero recomendado):
   ```bash
   psql "<DATABASE_URL_ADMIN>" -f database/neon_connection.sql
   ```
6. Ejecutar migraciones Prisma contra Neon:
   ```bash
   npm run prisma:deploy
   ```
7. Iniciar el servidor en desarrollo:
   ```bash
   npm run dev
   ```
   La API se expone en `http://localhost:4000`.
8. (Opcional) Ejecutar la suite de pruebas:
   ```bash
   npm test
   ```

## Scripts principales

| Script                  | Descripción                                             |
| ----------------------- | ------------------------------------------------------- |
| `npm run dev`           | ts-node + nodemon con recarga automática                |
| `npm run build`         | Compila a JavaScript en `dist/`                         |
| `npm start`             | Ejecuta la build compilada                              |
| `npm run prisma:dev`    | Aplica migraciones locales                              |
| `npm run prisma:deploy` | Aplica migraciones en Neon                              |
| `npm run prisma:generate` | Regenera el cliente Prisma                            |
| `npm test`              | Ejecuta Jest + Supertest para los flujos críticos       |

## Arquitectura

```
src/
  config/       # env, cors, prisma
  controllers/  # capa HTTP
  routes/       # /api/v1 sub-routers
  services/     # lógica de negocio
  middlewares/  # auth, validación, errores
  schemas/      # Zod
  utils/        # helpers (tokens, logger, etc.)
  database/     # exports prisma & scripts
docs/
  API.md        # referencia de endpoints
```

Documentación detallada de endpoints en `docs/API.md`.

## Verificaciones rápidas

- `GET /api/v1/system/test-db` → prueba conexión Neon (`SELECT NOW()`).
- `GET /api/v1/system/protected-ping` → requiere JWT válido.
- `docs/API.md` contiene ejemplos completos por recurso.

### cURL útiles

```bash
# Login inválido
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"no@existe.test","password":"Secret123!"}'

# Login válido (ajusta credenciales)
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sunat.pe","password":"TuPassword"}'

# Endpoint protegido
curl http://localhost:4000/api/v1/system/protected-ping \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

## Seguridad y buenas prácticas

- Lista blanca CORS configurable vía `CORS_ORIGIN`.
- Bcrypt con 12 rondas, JWT de acceso y refresh independientes.
- Manejo centralizado de errores y respuestas normalizadas (`success`, `data`, `details`).
- Prisma singleton para evitar fugas de conexiones.

## Despliegue

1. Configurar las variables en el proveedor (Render, Railway, Fly, etc.).
2. Ejecutar `npm run prisma:deploy` tras cada release.
3. Construir e iniciar:
   ```bash
   npm run build
   npm start
   ```
4. Revisar `/health`, `/api/v1/system/test-db` y una ruta protegida para validar.

## Recursos adicionales

- [Prisma Docs](https://www.prisma.io/docs)
- [Neon Docs](https://neon.tech/docs)
- [API Docs](./docs/API.md)
