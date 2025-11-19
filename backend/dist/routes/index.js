"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const recaudacion_routes_1 = __importDefault(require("./recaudacion.routes"));
const fiscalizacion_routes_1 = __importDefault(require("./fiscalizacion.routes"));
const contribuyentes_routes_1 = __importDefault(require("./contribuyentes.routes"));
const declaraciones_routes_1 = __importDefault(require("./declaraciones.routes"));
const reportes_routes_1 = __importDefault(require("./reportes.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/recaudacion', recaudacion_routes_1.default);
router.use('/fiscalizacion', fiscalizacion_routes_1.default);
router.use('/contribuyentes', contribuyentes_routes_1.default);
router.use('/declaraciones', declaraciones_routes_1.default);
router.use('/reportes', reportes_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map