# 🚀 Guía de Configuración de Jenkins para Dashboard SUNAT

## Requisitos Previos

1. **Jenkins instalado y corriendo**
2. **Node.js >= 18** instalado en el agente Jenkins
3. **Git** configurado en el agente
4. **Acceso a la base de datos Neon** para tests

## Configuración de Credenciales en Jenkins

### Paso 1: Crear Credenciales

Ve a **Jenkins → Manage Jenkins → Credentials → System → Global credentials** y crea las siguientes credenciales:

#### 1. NEON_DB_URL (Secret text)
- **ID:** `NEON_DB_URL`
- **Descripción:** URL de conexión a Neon PostgreSQL
- **Secret:** Tu `DATABASE_URL` completa de Neon
  ```
  postgresql://user:password@host:5432/dbname?sslmode=require
  ```

#### 2. JWT_ACCESS_SECRET (Secret text)
- **ID:** `JWT_ACCESS_SECRET`
- **Descripción:** Secreto para JWT access tokens
- **Secret:** Un string aleatorio de al menos 32 caracteres
  ```
  tu_secreto_super_largo_y_seguro_minimo_32_caracteres_12345678901234567890
  ```

#### 3. JWT_REFRESH_SECRET (Secret text)
- **ID:** `JWT_REFRESH_SECRET`
- **Descripción:** Secreto para JWT refresh tokens
- **Secret:** Otro string aleatorio de al menos 32 caracteres (diferente al anterior)
  ```
  otro_secreto_super_largo_y_seguro_minimo_32_caracteres_09876543210987654321
  ```

### Paso 2: Crear el Job de Jenkins

1. **Crear nuevo Pipeline Job:**
   - Jenkins → New Item
   - Nombre: `sunat-dashboard-pipeline`
   - Tipo: **Pipeline**
   - Click **OK**

2. **Configurar el Pipeline:**
   - En la sección **Pipeline**, selecciona:
     - **Definition:** Pipeline script from SCM
     - **SCM:** Git
     - **Repository URL:** URL de tu repositorio
     - **Credentials:** (si es privado)
     - **Branch Specifier:** `*/main` o `*/master`
     - **Script Path:** `Jenkinsfile`

3. **Configurar Build Triggers (Opcional):**
   - **Poll SCM:** `H/5 * * * *` (cada 5 minutos)
   - O **GitHub hook trigger** si usas GitHub

4. **Guardar** y hacer clic en **Build Now**

## Estructura del Pipeline

El pipeline ejecuta los siguientes stages en orden:

1. ✅ **Checkout** - Obtiene el código del repositorio
2. ✅ **Setup Node.js** - Verifica/instala Node.js
3. ✅ **Install Dependencies** - Instala dependencias (backend y frontend en paralelo)
4. ✅ **Prisma Setup** - Genera Prisma Client y verifica conexión a DB
5. ✅ **Build** - Compila TypeScript y build de Vite (en paralelo)
6. ✅ **Lint** - Ejecuta linters (si están configurados)
7. ✅ **Test** - Ejecuta tests de Jest
8. ✅ **Database Migrations** - Aplica migraciones (solo en main/master)
9. ✅ **Deploy** - Simula deploy (solo en main/master)

## Variables de Entorno Disponibles

El pipeline expone las siguientes variables de entorno:

```groovy
DATABASE_URL              // Desde credencial NEON_DB_URL
JWT_ACCESS_TOKEN_SECRET   // Desde credencial JWT_ACCESS_SECRET
JWT_REFRESH_TOKEN_SECRET // Desde credencial JWT_REFRESH_SECRET
NODE_ENV                  // 'test' durante el pipeline
PORT                      // '4000'
CORS_ORIGIN               // 'http://localhost:5173'
```

## Personalización

### Ejecutar Migraciones Manualmente

Si necesitas ejecutar migraciones en un branch que no sea main/master:

1. En el job de Jenkins, ve a **Build with Parameters**
2. Marca el parámetro `RUN_MIGRATIONS`
3. Ejecuta el build

### Agregar Notificaciones

Descomenta las secciones de `emailext` en el `Jenkinsfile` y configura:

```groovy
emailext (
    subject: "✅ Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
    body: "Build completed successfully.",
    to: "team@example.com"
)
```

### Agregar Slack Notifications

Instala el plugin **Slack Notification Plugin** y agrega:

```groovy
slackSend(
    channel: '#devops',
    color: 'good',
    message: "✅ Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
)
```

## Troubleshooting

### Error: "Node.js no encontrado"
- Instala Node.js en el agente Jenkins
- O usa un agente con Node.js preinstalado
- O configura `nvm` en el pipeline

### Error: "Database connection failed"
- Verifica que `NEON_DB_URL` esté correctamente configurada
- Verifica que la base de datos Neon esté accesible desde el agente
- Verifica que el SSL esté habilitado (`sslmode=require`)

### Error: "Tests failed"
- Revisa los logs del stage Test
- Verifica que las variables de entorno estén correctas
- Verifica que la base de datos tenga los datos necesarios para tests

### Error: "Build failed"
- Revisa los logs completos del pipeline
- Verifica que todas las dependencias estén instaladas
- Verifica que no haya errores de TypeScript

## Mejores Prácticas

1. ✅ **Nunca commits credenciales** - Usa Jenkins Credentials
2. ✅ **Ejecuta tests antes de deploy** - El pipeline lo hace automáticamente
3. ✅ **Revisa logs regularmente** - Identifica problemas temprano
4. ✅ **Mantén el Jenkinsfile en el repo** - Versiona los cambios del pipeline
5. ✅ **Usa branches protegidos** - Solo permite merge después de pipeline exitoso

## Recursos Adicionales

- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
- [Prisma Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Neon Documentation](https://neon.tech/docs)

