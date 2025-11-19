import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';

export const listFiscalizaciones = () => {
  return prisma.fiscalizacion.findMany({
    orderBy: { fechaRegistro: 'desc' },
  });
};

export const getFiscalizacionById = (id: number) => {
  return prisma.fiscalizacion.findUnique({ where: { id } });
};

export const createFiscalizacion = (data: Prisma.FiscalizacionCreateInput) => {
  return prisma.fiscalizacion.create({ data });
};

export const updateFiscalizacion = (id: number, data: Prisma.FiscalizacionUpdateInput) => {
  return prisma.fiscalizacion.update({ where: { id }, data });
};

export const deleteFiscalizacion = (id: number) => {
  return prisma.fiscalizacion.delete({ where: { id } });
};

