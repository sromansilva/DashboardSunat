import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';

export const listDeclaraciones = () => {
  return prisma.declaracion.findMany({
    include: { contribuyente: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const getDeclaracionById = (id: number) => {
  return prisma.declaracion.findUnique({
    where: { id },
    include: { contribuyente: true },
  });
};

export const createDeclaracion = (data: Prisma.DeclaracionUncheckedCreateInput) => {
  return prisma.declaracion.create({ data });
};

export const updateDeclaracion = (id: number, data: Prisma.DeclaracionUncheckedUpdateInput) => {
  return prisma.declaracion.update({ where: { id }, data });
};

export const deleteDeclaracion = (id: number) => {
  return prisma.declaracion.delete({ where: { id } });
};

