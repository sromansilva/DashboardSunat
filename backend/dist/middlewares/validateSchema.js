"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const response_1 = require("../utils/response");
const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            return next();
        }
        catch (error) {
            const zodError = error;
            return (0, response_1.sendError)(res, 'Validación fallida', 422, zodError.flatten());
        }
    };
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validateSchema.js.map