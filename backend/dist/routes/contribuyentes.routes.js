"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contribuyentes_controller_1 = require("../controllers/contribuyentes.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validateSchema_1 = require("../middlewares/validateSchema");
const contribuyentes_schema_1 = require("../schemas/contribuyentes.schema");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.get('/', contribuyentes_controller_1.getContribuyentes);
router.get('/:id/historial', (0, validateSchema_1.validateSchema)(contribuyentes_schema_1.contribuyenteByIdSchema), contribuyentes_controller_1.getHistorial);
router.get('/:id', (0, validateSchema_1.validateSchema)(contribuyentes_schema_1.contribuyenteByIdSchema), contribuyentes_controller_1.getContribuyente);
router.post('/', (0, validateSchema_1.validateSchema)(contribuyentes_schema_1.createContribuyenteSchema), contribuyentes_controller_1.createContribuyenteController);
router.put('/:id', (0, validateSchema_1.validateSchema)(contribuyentes_schema_1.updateContribuyenteSchema), contribuyentes_controller_1.updateContribuyenteController);
router.delete('/:id', (0, validateSchema_1.validateSchema)(contribuyentes_schema_1.contribuyenteByIdSchema), contribuyentes_controller_1.deleteContribuyenteController);
exports.default = router;
//# sourceMappingURL=contribuyentes.routes.js.map