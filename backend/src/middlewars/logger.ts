import { errorLogger, logger } from 'express-winston';
import { format, transports } from 'winston';

export const requestLogger = logger({
  transports: [new transports.File({ filename: 'request.log' })],
  format: format.json(),
});

export const errorsLogger = errorLogger({
  transports: [new transports.File({ filename: 'error.log' })],
  format: format.json(),
});
