import { Router } from 'express';
import {
  createContribuyenteController,
  deleteContribuyenteController,
  getContribuyente,
  getContribuyentes,
  getHistorial,
  updateContribuyenteController,
} from '../controllers/contribuyentes.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateSchema } from '../middlewares/validateSchema';
import {
  contribuyenteByIdSchema,
  createContribuyenteSchema,
  updateContribuyenteSchema,
} from '../schemas/contribuyentes.schema';

const router = Router();

router.use(authMiddleware);

router.get('/', getContribuyentes);
router.get('/:id/historial', validateSchema(contribuyenteByIdSchema), getHistorial);
router.get('/:id', validateSchema(contribuyenteByIdSchema), getContribuyente);
router.post('/', validateSchema(createContribuyenteSchema), createContribuyenteController);
router.put('/:id', validateSchema(updateContribuyenteSchema), updateContribuyenteController);
router.delete('/:id', validateSchema(contribuyenteByIdSchema), deleteContribuyenteController);

export default router;

