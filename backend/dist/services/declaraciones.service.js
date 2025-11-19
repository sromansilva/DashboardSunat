"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeclaracion = exports.updateDeclaracion = exports.createDeclaracion = exports.getDeclaracionById = exports.listDeclaraciones = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const listDeclaraciones = () => {
    return prisma_1.default.declaracion.findMany({
        include: { contribuyente: true },
        orderBy: { createdAt: 'desc' },
    });
};
exports.listDeclaraciones = listDeclaraciones;
const getDeclaracionById = (id) => {
    return prisma_1.default.declaracion.findUnique({
        where: { id },
        include: { contribuyente: true },
    });
};
exports.getDeclaracionById = getDeclaracionById;
const createDeclaracion = (data) => {
    return prisma_1.default.declaracion.create({ data });
};
exports.createDeclaracion = createDeclaracion;
const updateDeclaracion = (id, data) => {
    return prisma_1.default.declaracion.update({ where: { id }, data });
};
exports.updateDeclaracion = updateDeclaracion;
const deleteDeclaracion = (id) => {
    return prisma_1.default.declaracion.delete({ where: { id } });
};
exports.deleteDeclaracion = deleteDeclaracion;
//# sourceMappingURL=declaraciones.service.js.map