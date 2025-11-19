import { Router } from 'express';
import { createReporteController, getReporteController } from '../controllers/reportes.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateSchema } from '../middlewares/validateSchema';
import { createReporteSchema, reporteByIdSchema } from '../schemas/reportes.schema';

const router = Router();

router.use(authMiddleware);

router.post('/', validateSchema(createReporteSchema), createReporteController);
router.get('/:id', validateSchema(reporteByIdSchema), getReporteController);

export default router;

