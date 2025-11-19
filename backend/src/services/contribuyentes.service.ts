import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';

export const listContribuyentes = () => {
  return prisma.contribuyente.findMany({
    include: { declaraciones: true },
  });
};

export const getContribuyenteById = (id: number) => {
  return prisma.contribuyente.findUnique({
    where: { id },
    include: { declaraciones: true },
  });
};

export const getHistorialContribuyente = (id: number) => {
  return prisma.contribuyente.findUnique({
    where: { id },
    select: { historialJson: true, ruc: true, nombre: true },
  });
};

export const createContribuyente = (data: Prisma.ContribuyenteCreateInput) => {
  return prisma.contribuyente.create({ data });
};

export const updateContribuyente = (id: number, data: Prisma.ContribuyenteUpdateInput) => {
  return prisma.contribuyente.update({ where: { id }, data });
};

export const deleteContribuyente = (id: number) => {
  return prisma.contribuyente.delete({ where: { id } });
};

