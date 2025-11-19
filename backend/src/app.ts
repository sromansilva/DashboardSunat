import express from 'express';
import helmet from 'helmet';
import corsMiddleware from './config/cors';
import routes from './routes';
import notFound from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';
import prisma from './config/prisma';

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ success: true, data: { status: 'ok', db: 'connected' } });
  } catch (error) {
    return res.status(503).json({ success: false, message: 'DB disconnected', details: error });
  }
});

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

export default app;

