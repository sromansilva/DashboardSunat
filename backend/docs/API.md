# SUNAT Analytics API v1

Base URL: `/api/v1`

Todas las respuestas siguen el formato:

```json
{
  "success": true,
  "data": {},
  "message": "opcional"
}
```

Errores:

```json
{
  "success": false,
  "message": "Descripción del error",
  "details": {}
}
```

## Autenticación

### POST `/auth/register`

Crea un usuario. Roles: `admin | analista | supervisor`.

```json
{
  "username": "admin",
  "email": "admin@sunat.pe",
  "password": "UltraSegura123",
  "role": "admin"
}
```

### POST `/auth/login`

```json
{
  "email": "admin@sunat.pe",
  "password": "UltraSegura123"
}
```

Respuesta:

```json
{
  "success": true,
  "data": {
    "user": { "id": 1, "username": "admin", "role": "admin" },
    "tokens": {
      "accessToken": "<jwt>",
      "refreshToken": "<jwt>"
    }
  }
}
```

### POST `/auth/refresh-token`

```json
{ "refreshToken": "<jwt>" }
```

## Recaudación `/recaudacion`

Todas las rutas requieren JWT.

- `GET /` filtros `periodo`, `departamento`, `tipoContribuyente`, `regimen`.
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

Cuerpo `POST`:

```json
{
  "periodo": "2024-01",
  "departamento": "LIMA",
  "tipoContribuyente": "Gran Empresa",
  "regimen": "General",
  "monto": 125000000.50
}
```

## Fiscalización `/fiscalizacion`

CRUD completo. Campos obligatorios: `sector`, `riesgo`, `estado`, `descripcion`, `fechaRegistro` (auto si no se envía).

## Contribuyentes `/contribuyentes`

- `GET /` lista con declaraciones asociadas.
- `GET /:id`
- `GET /:id/historial` devuelve `historialJson`.
- `POST /` crea contribuyente.
- `PUT /:id`
- `DELETE /:id`

Ejemplo de `historialJson`:

```json
{
  "visitas": [
    { "fecha": "2024-02-10", "resultado": "Sin hallazgos" }
  ]
}
```

## Declaraciones `/declaraciones`

CRUD que enlaza con `contribuyenteId`. Campos: `tipo`, `periodo`, `estado`, `inconsistenciasJson`.

## Reportes `/reportes`

Genera reportes simulando exportación (`pdf`, `csv`, `xlsx`).

- `POST /`

```json
{
  "tipo": "recaudacion-2024",
  "periodoInicio": "2024-01-01",
  "periodoFin": "2024-03-31",
  "formato": "pdf",
  "metadata": { "departamento": "LIMA" }
}
```

Respuesta incluye `exportUrl` simulado.

- `GET /:id` devuelve metadatos del reporte y el usuario que lo generó.

## Sistema `/system`

- `GET /test-db`: ejecuta `SELECT NOW()` en Neon y responde con el timestamp.
- `GET /protected-ping`: requiere JWT válido, ideal para probar el middleware. Respuesta:

```json
{
  "success": true,
  "data": {
    "user": {
      "userId": 1,
      "role": "admin"
    }
  },
  "message": "Acceso autorizado"
}
```

## Errores comunes

| Código | Motivo                         |
| ------ | ------------------------------ |
| 400    | Validación fallida             |
| 401    | Token ausente o inválido       |
| 403    | Permisos insuficientes         |
| 404    | Registro no encontrado         |
| 500    | Error interno inesperado       |


