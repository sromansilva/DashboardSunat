"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const declaraciones_controller_1 = require("../controllers/declaraciones.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validateSchema_1 = require("../middlewares/validateSchema");
const declaraciones_schema_1 = require("../schemas/declaraciones.schema");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.get('/', declaraciones_controller_1.getDeclaraciones);
router.get('/:id', (0, validateSchema_1.validateSchema)(declaraciones_schema_1.declaracionByIdSchema), declaraciones_controller_1.getDeclaracion);
router.post('/', (0, validateSchema_1.validateSchema)(declaraciones_schema_1.createDeclaracionSchema), declaraciones_controller_1.createDeclaracionController);
router.put('/:id', (0, validateSchema_1.validateSchema)(declaraciones_schema_1.updateDeclaracionSchema), declaraciones_controller_1.updateDeclaracionController);
router.delete('/:id', (0, validateSchema_1.validateSchema)(declaraciones_schema_1.declaracionByIdSchema), declaraciones_controller_1.deleteDeclaracionController);
exports.default = router;
//# sourceMappingURL=declaraciones.routes.js.map