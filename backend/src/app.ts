import express from 'express';
import helmet from 'helmet';
import corsMiddleware from './config/cors';
import routes from './routes';
import notFound from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  return res.json({ success: true, data: { status: 'ok' } });
});

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

export default app;

