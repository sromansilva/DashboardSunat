"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContribuyente = exports.updateContribuyente = exports.createContribuyente = exports.getHistorialContribuyente = exports.getContribuyenteById = exports.listContribuyentes = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const listContribuyentes = () => {
    return prisma_1.default.contribuyente.findMany({
        include: { declaraciones: true },
    });
};
exports.listContribuyentes = listContribuyentes;
const getContribuyenteById = (id) => {
    return prisma_1.default.contribuyente.findUnique({
        where: { id },
        include: { declaraciones: true },
    });
};
exports.getContribuyenteById = getContribuyenteById;
const getHistorialContribuyente = (id) => {
    return prisma_1.default.contribuyente.findUnique({
        where: { id },
        select: { historialJson: true, ruc: true, nombre: true },
    });
};
exports.getHistorialContribuyente = getHistorialContribuyente;
const createContribuyente = (data) => {
    return prisma_1.default.contribuyente.create({ data });
};
exports.createContribuyente = createContribuyente;
const updateContribuyente = (id, data) => {
    return prisma_1.default.contribuyente.update({ where: { id }, data });
};
exports.updateContribuyente = updateContribuyente;
const deleteContribuyente = (id) => {
    return prisma_1.default.contribuyente.delete({ where: { id } });
};
exports.deleteContribuyente = deleteContribuyente;
//# sourceMappingURL=contribuyentes.service.js.map