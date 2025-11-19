-- Neon connection bootstrap script
-- Ejecuta este archivo una sola vez en tu base de datos Neon
-- usando psql o el panel SQL de Neon.

-- 1. Crea el rol de la aplicación (reemplaza PASSWORD por un valor fuerte)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_catalog.pg_roles WHERE rolname = 'sunat_app'
  ) THEN
    CREATE ROLE sunat_app LOGIN PASSWORD 'Sunat_App2025@Neon';
  END IF;
END
$$;

-- 2. Asigna el search_path y permisos mínimos
ALTER ROLE sunat_app SET search_path = public;
GRANT CONNECT ON DATABASE neon TO sunat_app;
GRANT USAGE ON SCHEMA public TO sunat_app;

-- 3. Otorga privilegios CRUD para todas las tablas actuales y futuras
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO sunat_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO sunat_app;

-- 4. Permisos para secuencias (auto increment de Prisma)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO sunat_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT USAGE, SELECT ON SEQUENCES TO sunat_app;

-- 5. (Opcional) habilita PgBouncer para mejores pools
-- Desde el dashboard de Neon, crea un pool e introduce la URL en DATABASE_URL
-- DATABASE_URL="postgresql://sunat_app:CAMBIA_ESTA_PASSWORD@<pool-host>/<db>?sslmode=require&pooler=true"


