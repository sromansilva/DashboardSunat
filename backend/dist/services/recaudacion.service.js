"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecaudacion = exports.updateRecaudacion = exports.createRecaudacion = exports.getRecaudacionById = exports.listRecaudacion = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const listRecaudacion = async (filters) => {
    const where = {};
    if (filters.periodo)
        where.periodo = filters.periodo;
    if (filters.departamento)
        where.departamento = filters.departamento;
    if (filters.tipoContribuyente)
        where.tipoContribuyente = filters.tipoContribuyente;
    if (filters.regimen)
        where.regimen = filters.regimen;
    return prisma_1.default.recaudacion.findMany({
        where,
        orderBy: { creadoEl: 'desc' },
    });
};
exports.listRecaudacion = listRecaudacion;
const getRecaudacionById = (id) => {
    return prisma_1.default.recaudacion.findUnique({ where: { id } });
};
exports.getRecaudacionById = getRecaudacionById;
const createRecaudacion = (data) => {
    return prisma_1.default.recaudacion.create({ data });
};
exports.createRecaudacion = createRecaudacion;
const updateRecaudacion = (id, data) => {
    return prisma_1.default.recaudacion.update({ where: { id }, data });
};
exports.updateRecaudacion = updateRecaudacion;
const deleteRecaudacion = (id) => {
    return prisma_1.default.recaudacion.delete({ where: { id } });
};
exports.deleteRecaudacion = deleteRecaudacion;
//# sourceMappingURL=recaudacion.service.js.map