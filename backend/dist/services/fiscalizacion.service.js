"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiscalizacion = exports.updateFiscalizacion = exports.createFiscalizacion = exports.getFiscalizacionById = exports.listFiscalizaciones = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const listFiscalizaciones = () => {
    return prisma_1.default.fiscalizacion.findMany({
        orderBy: { fechaRegistro: 'desc' },
    });
};
exports.listFiscalizaciones = listFiscalizaciones;
const getFiscalizacionById = (id) => {
    return prisma_1.default.fiscalizacion.findUnique({ where: { id } });
};
exports.getFiscalizacionById = getFiscalizacionById;
const createFiscalizacion = (data) => {
    return prisma_1.default.fiscalizacion.create({ data });
};
exports.createFiscalizacion = createFiscalizacion;
const updateFiscalizacion = (id, data) => {
    return prisma_1.default.fiscalizacion.update({ where: { id }, data });
};
exports.updateFiscalizacion = updateFiscalizacion;
const deleteFiscalizacion = (id) => {
    return prisma_1.default.fiscalizacion.delete({ where: { id } });
};
exports.deleteFiscalizacion = deleteFiscalizacion;
//# sourceMappingURL=fiscalizacion.service.js.map