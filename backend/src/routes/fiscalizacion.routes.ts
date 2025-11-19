import { Router } from 'express';
import {
  createFiscalizacionController,
  deleteFiscalizacionController,
  getFiscalizacion,
  getFiscalizaciones,
  updateFiscalizacionController,
} from '../controllers/fiscalizacion.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateSchema } from '../middlewares/validateSchema';
import {
  createFiscalizacionSchema,
  fiscalizacionByIdSchema,
  updateFiscalizacionSchema,
} from '../schemas/fiscalizacion.schema';

const router = Router();

router.use(authMiddleware);

router.get('/', getFiscalizaciones);
router.get('/:id', validateSchema(fiscalizacionByIdSchema), getFiscalizacion);
router.post('/', validateSchema(createFiscalizacionSchema), createFiscalizacionController);
router.put('/:id', validateSchema(updateFiscalizacionSchema), updateFiscalizacionController);
router.delete('/:id', validateSchema(fiscalizacionByIdSchema), deleteFiscalizacionController);

export default router;

