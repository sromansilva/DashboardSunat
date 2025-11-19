-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'analista', 'supervisor');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'analista',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recaudacion" (
    "id" SERIAL NOT NULL,
    "periodo" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "tipo_contribuyente" TEXT NOT NULL,
    "regimen" TEXT NOT NULL,
    "monto" DECIMAL(18,2) NOT NULL,
    "creado_el" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recaudacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fiscalizacion" (
    "id" SERIAL NOT NULL,
    "sector" TEXT NOT NULL,
    "riesgo" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fiscalizacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribuyente" (
    "id" SERIAL NOT NULL,
    "ruc" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "actividad_economica" TEXT NOT NULL,
    "historial_json" JSONB NOT NULL,

    CONSTRAINT "Contribuyente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Declaracion" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "inconsistencias_json" JSONB NOT NULL,
    "contribuyente_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Declaracion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "periodo_inicio" TIMESTAMP(3) NOT NULL,
    "periodo_fin" TIMESTAMP(3) NOT NULL,
    "formato" TEXT NOT NULL,
    "generado_por" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contribuyente_ruc_key" ON "Contribuyente"("ruc");

-- AddForeignKey
ALTER TABLE "Declaracion" ADD CONSTRAINT "Declaracion_contribuyente_id_fkey" FOREIGN KEY ("contribuyente_id") REFERENCES "Contribuyente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_generado_por_fkey" FOREIGN KEY ("generado_por") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

