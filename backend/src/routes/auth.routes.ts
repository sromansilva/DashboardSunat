import { Router } from 'express';
import { login, refresh, register } from '../controllers/auth.controller';
import { validateSchema } from '../middlewares/validateSchema';
import { loginSchema, refreshSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/refresh-token', validateSchema(refreshSchema), refresh);

export default router;

