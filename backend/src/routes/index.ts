import { Router } from 'express';
import authRoutes from './auth.routes';
import recaudacionRoutes from './recaudacion.routes';
import fiscalizacionRoutes from './fiscalizacion.routes';
import contribuyentesRoutes from './contribuyentes.routes';
import declaracionesRoutes from './declaraciones.routes';
import reportesRoutes from './reportes.routes';
import systemRoutes from './system.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/recaudacion', recaudacionRoutes);
router.use('/fiscalizacion', fiscalizacionRoutes);
router.use('/contribuyentes', contribuyentesRoutes);
router.use('/declaraciones', declaracionesRoutes);
router.use('/reportes', reportesRoutes);
router.use('/system', systemRoutes);

export default router;

