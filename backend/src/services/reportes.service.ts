import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';

interface ReporteInput {
  tipo: string;
  periodoInicio: Date;
  periodoFin: Date;
  formato: string;
  metadata?: Prisma.InputJsonValue;
}

export const createReporte = async (input: ReporteInput, generadoPorId?: number) => {
  const data: Prisma.ReportUncheckedCreateInput = {
    tipo: input.tipo,
    periodoInicio: input.periodoInicio,
    periodoFin: input.periodoFin,
    formato: input.formato,
    metadata: input.metadata ?? ({} as Prisma.InputJsonValue),
  };

  if (typeof generadoPorId === 'number') {
    data.generadoPorId = generadoPorId;
  }

  const reporte = await prisma.report.create({ data });

  const exportUrl = simulateExport(reporte.id, input.formato);

  return { reporte, exportUrl };
};

export const getReporteById = (id: number) => {
  return prisma.report.findUnique({
    where: { id },
    include: { generadoPor: true },
  });
};

const simulateExport = (reporteId: number, formato: string) => {
  const filename = `reporte_${reporteId}.${formato}`;
  return `https://storage.fake-neon.app/reports/${filename}`;
};

