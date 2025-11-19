"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recaudacion_controller_1 = require("../controllers/recaudacion.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validateSchema_1 = require("../middlewares/validateSchema");
const recaudacion_schema_1 = require("../schemas/recaudacion.schema");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.get('/', (0, validateSchema_1.validateSchema)(recaudacion_schema_1.recaudacionFiltersSchema), recaudacion_controller_1.getAllRecaudacion);
router.get('/:id', (0, validateSchema_1.validateSchema)(recaudacion_schema_1.recaudacionByIdSchema), recaudacion_controller_1.getRecaudacion);
router.post('/', (0, validateSchema_1.validateSchema)(recaudacion_schema_1.createRecaudacionSchema), recaudacion_controller_1.createRecaudacionController);
router.put('/:id', (0, validateSchema_1.validateSchema)(recaudacion_schema_1.updateRecaudacionSchema), recaudacion_controller_1.updateRecaudacionController);
router.delete('/:id', (0, validateSchema_1.validateSchema)(recaudacion_schema_1.recaudacionByIdSchema), recaudacion_controller_1.deleteRecaudacionController);
exports.default = router;
//# sourceMappingURL=recaudacion.routes.js.map