# 🔍 Guía de Debugging para Login

## Problemas Comunes y Soluciones

### 1. Verificar que el backend esté corriendo

```bash
# En una terminal, verifica que el backend esté activo
curl http://localhost:4000/health
```

Deberías ver:
```json
{"success":true,"data":{"status":"ok","db":"connected"}}
```

### 2. Verificar que el usuario existe en la base de datos

```bash
# Conecta a tu base de datos Neon y ejecuta:
SELECT id, username, email, role FROM "User";
```

### 3. Probar login directamente con curl

```bash
# Reemplaza con tus credenciales reales
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"TU_EMAIL_AQUI","password":"TU_PASSWORD_AQUI"}'
```

**Respuesta esperada (éxito):**
```json
{
  "success": true,
  "data": {
    "user": {...},
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
}
```

**Respuesta esperada (error):**
```json
{
  "success": false,
  "message": "Credenciales inválidas",
  "details": {}
}
```

### 4. Verificar logs del backend

Cuando intentas hacer login, revisa la consola del backend. Deberías ver:
- Requests entrantes
- Errores de validación
- Errores de base de datos

### 5. Verificar en el navegador

1. Abre las **DevTools** (F12)
2. Ve a la pestaña **Network**
3. Intenta hacer login
4. Busca la petición a `/api/v1/auth/login`
5. Revisa:
   - **Status Code**: Debería ser 200 (éxito) o 401/400 (error)
   - **Request Payload**: Verifica que se envíe `email` y `password`
   - **Response**: Revisa el mensaje de error si hay

### 6. Problemas comunes

#### Error: "Credenciales inválidas"
- ✅ Verifica que el email/usuario sea correcto
- ✅ Verifica que la contraseña sea correcta
- ✅ Asegúrate de usar el **email** o **username** que usaste al registrarte

#### Error: "Error de conexión"
- ✅ Verifica que el backend esté corriendo (`npm run dev` en `backend/`)
- ✅ Verifica que el puerto sea 4000
- ✅ Verifica CORS (el frontend debe estar en `http://localhost:5173`)

#### Error: "Datos inválidos"
- ✅ El email debe ser un formato válido (si usas email)
- ✅ La contraseña debe tener al menos 1 carácter (ahora no requiere mínimo 8)

### 7. Crear un usuario de prueba

Si no tienes un usuario, créalo con:

```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123!",
    "role": "admin"
  }'
```

Luego intenta login con:
- **Email**: `test@example.com`
- **Password**: `Test123!`

O con:
- **Usuario**: `testuser`
- **Password**: `Test123!`

### 8. Verificar variables de entorno

Asegúrate de que `backend/.env` tenga:
```env
DATABASE_URL="postgresql://..."
JWT_ACCESS_TOKEN_SECRET="..."
JWT_REFRESH_TOKEN_SECRET="..."
CORS_ORIGIN=http://localhost:5173
```

### 9. Limpiar localStorage

Si hay tokens corruptos, limpia el localStorage:

```javascript
// En la consola del navegador (F12)
localStorage.clear();
```

Luego intenta login nuevamente.

---

## Checklist de Verificación

- [ ] Backend corriendo en puerto 4000
- [ ] Frontend corriendo en puerto 5173
- [ ] Usuario existe en la base de datos
- [ ] Credenciales correctas (email/username y password)
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores en la consola del backend
- [ ] CORS configurado correctamente
- [ ] DATABASE_URL válida y conectada

---

Si después de verificar todo esto aún no funciona, comparte:
1. El mensaje de error exacto que ves
2. El status code de la petición (Network tab)
3. Los logs del backend
4. La respuesta completa del servidor

