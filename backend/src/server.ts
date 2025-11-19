import app from './app';
import appConfig from './config/env';
import logger from './utils/logger';
import prisma from './config/prisma';



const server = app.listen(appConfig.PORT, () => {
  logger.info(`API corriendo en http://localhost:${appConfig.PORT}`);
});

const shutdown = async () => {
  logger.info('Apagando servidor...');
  server.close();
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

