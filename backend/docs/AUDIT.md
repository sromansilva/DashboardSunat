# Auditoría de Autenticación y Conexión Neon

## Hallazgos principales

1. **Validación de credenciales incompleta** – `loginUser` devolvía tokens incluso cuando `comparePassword` no coincidía si no se manejaba correctamente el `throw`; se reforzó con `AppError` (ver `src/services/auth.service.ts`).
2. **Falta de endpoints de verificación** – No existía una forma estándar de probar la conexión a Neon ni un endpoint protegido sencillo.
3. **Sin cobertura automatizada** – No había pruebas que garantizaran 401 en credenciales inválidas ni validaran `authMiddleware`.
4. **Conexión Neon sin guía operativa** – Faltaba documentación y script SQL para crear roles/permisos.

## Correcciones Aplicadas

| Área | Descripción | Archivos |
| --- | --- | --- |
| Validación login | Lanzar `AppError` ante usuarios inexistentes o passwords inválidas (asegurando `comparePassword` siempre se evalúe) | `src/services/auth.service.ts` |
| Puntos de diagnóstico | Nuevos endpoints `/api/v1/system/test-db` y `/api/v1/system/protected-ping` | `src/controllers/system.controller.ts`, `src/routes/system.routes.ts`, `src/routes/index.ts` |
| Pruebas automáticas | Suite Jest + Supertest para login inválido/válido y rutas protegidas | `jest.config.ts`, `tests/setupEnv.ts`, `tests/auth.e2e.test.ts`, `package.json` |
| Seguridad Neon | Script SQL para crear rol `sunat_app`, permisos y uso de pooler | `database/neon_connection.sql` |
| Documentación | README con pasos detallados, API.md con nuevas rutas, instrucciones de curl y pruebas | `README.md`, `docs/API.md` |

## Pruebas ejecutadas

```bash
npm run build       # verifica compilación TypeScript
npm test            # Jest + Supertest (6 pruebas)
```

## cURL de verificación

```bash
# Credenciales inválidas -> 401
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"no@existe.test","password":"Secret123!"}'

# Credenciales válidas (ajusta datos reales) -> tokens
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sunat.pe","password":"TuPassword"}'

# Endpoint protegido sin token -> 401
curl http://localhost:4000/api/v1/system/protected-ping

# Endpoint protegido con token válido -> 200
curl http://localhost:4000/api/v1/system/protected-ping \
  -H "Authorization: Bearer <ACCESS_TOKEN>"

# Test de conexión Neon
curl http://localhost:4000/api/v1/system/test-db
```

## Resultado

Solo credenciales válidas generan tokens, el middleware JWT bloquea accesos indebidos y la conexión a Neon queda verificada/diagnosticada mediante `/system/test-db`. Las pruebas automatizadas evitan regresiones futuras.

