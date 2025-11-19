import { Router } from 'express';
import { protectedPing, testDbConnection } from '../controllers/system.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/test-db', testDbConnection);
router.get('/protected-ping', authMiddleware, protectedPing);

export default router;

