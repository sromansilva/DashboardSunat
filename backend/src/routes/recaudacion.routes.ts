import { Router } from 'express';
import {
  createRecaudacionController,
  deleteRecaudacionController,
  getAllRecaudacion,
  getRecaudacion,
  updateRecaudacionController,
} from '../controllers/recaudacion.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateSchema } from '../middlewares/validateSchema';
import {
  createRecaudacionSchema,
  recaudacionByIdSchema,
  recaudacionFiltersSchema,
  updateRecaudacionSchema,
} from '../schemas/recaudacion.schema';

const router = Router();

router.use(authMiddleware);

router.get('/', validateSchema(recaudacionFiltersSchema), getAllRecaudacion);
router.get('/:id', validateSchema(recaudacionByIdSchema), getRecaudacion);
router.post('/', validateSchema(createRecaudacionSchema), createRecaudacionController);
router.put('/:id', validateSchema(updateRecaudacionSchema), updateRecaudacionController);
router.delete('/:id', validateSchema(recaudacionByIdSchema), deleteRecaudacionController);

export default router;

