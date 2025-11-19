import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';

export interface RecaudacionFilters {
  periodo?: string;
  departamento?: string;
  tipoContribuyente?: string;
  regimen?: string;
}

export const listRecaudacion = async (filters: RecaudacionFilters) => {
  const where: Prisma.RecaudacionWhereInput = {};

  if (filters.periodo) where.periodo = filters.periodo;
  if (filters.departamento) where.departamento = filters.departamento;
  if (filters.tipoContribuyente) where.tipoContribuyente = filters.tipoContribuyente;
  if (filters.regimen) where.regimen = filters.regimen;

  return prisma.recaudacion.findMany({
    where,
    orderBy: { creadoEl: 'desc' },
  });
};

export const getRecaudacionById = (id: number) => {
  return prisma.recaudacion.findUnique({ where: { id } });
};

export const createRecaudacion = (data: Prisma.RecaudacionCreateInput) => {
  return prisma.recaudacion.create({ data });
};

export const updateRecaudacion = (id: number, data: Prisma.RecaudacionUpdateInput) => {
  return prisma.recaudacion.update({ where: { id }, data });
};

export const deleteRecaudacion = (id: number) => {
  return prisma.recaudacion.delete({ where: { id } });
};

