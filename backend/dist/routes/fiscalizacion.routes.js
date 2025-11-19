"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fiscalizacion_controller_1 = require("../controllers/fiscalizacion.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validateSchema_1 = require("../middlewares/validateSchema");
const fiscalizacion_schema_1 = require("../schemas/fiscalizacion.schema");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.get('/', fiscalizacion_controller_1.getFiscalizaciones);
router.get('/:id', (0, validateSchema_1.validateSchema)(fiscalizacion_schema_1.fiscalizacionByIdSchema), fiscalizacion_controller_1.getFiscalizacion);
router.post('/', (0, validateSchema_1.validateSchema)(fiscalizacion_schema_1.createFiscalizacionSchema), fiscalizacion_controller_1.createFiscalizacionController);
router.put('/:id', (0, validateSchema_1.validateSchema)(fiscalizacion_schema_1.updateFiscalizacionSchema), fiscalizacion_controller_1.updateFiscalizacionController);
router.delete('/:id', (0, validateSchema_1.validateSchema)(fiscalizacion_schema_1.fiscalizacionByIdSchema), fiscalizacion_controller_1.deleteFiscalizacionController);
exports.default = router;
//# sourceMappingURL=fiscalizacion.routes.js.map