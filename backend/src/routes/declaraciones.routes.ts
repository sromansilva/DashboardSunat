import { Router } from 'express';
import {
  createDeclaracionController,
  deleteDeclaracionController,
  getDeclaracion,
  getDeclaraciones,
  updateDeclaracionController,
} from '../controllers/declaraciones.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateSchema } from '../middlewares/validateSchema';
import {
  createDeclaracionSchema,
  declaracionByIdSchema,
  updateDeclaracionSchema,
} from '../schemas/declaraciones.schema';

const router = Router();

router.use(authMiddleware);

router.get('/', getDeclaraciones);
router.get('/:id', validateSchema(declaracionByIdSchema), getDeclaracion);
router.post('/', validateSchema(createDeclaracionSchema), createDeclaracionController);
router.put('/:id', validateSchema(updateDeclaracionSchema), updateDeclaracionController);
router.delete('/:id', validateSchema(declaracionByIdSchema), deleteDeclaracionController);

export default router;

