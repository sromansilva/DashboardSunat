"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const system_controller_1 = require("../controllers/system.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/test-db', system_controller_1.testDbConnection);
router.get('/protected-ping', authMiddleware_1.authMiddleware, system_controller_1.protectedPing);
exports.default = router;
//# sourceMappingURL=system.routes.js.map