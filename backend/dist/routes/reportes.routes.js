"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportes_controller_1 = require("../controllers/reportes.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validateSchema_1 = require("../middlewares/validateSchema");
const reportes_schema_1 = require("../schemas/reportes.schema");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authMiddleware);
router.post('/', (0, validateSchema_1.validateSchema)(reportes_schema_1.createReporteSchema), reportes_controller_1.createReporteController);
router.get('/:id', (0, validateSchema_1.validateSchema)(reportes_schema_1.reporteByIdSchema), reportes_controller_1.getReporteController);
exports.default = router;
//# sourceMappingURL=reportes.routes.js.map