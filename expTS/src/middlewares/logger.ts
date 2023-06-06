import { Request, Response, NextFunction } from 'express';
import { Tipo } from './loggerTypes';

function logger(tipo: Tipo) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (tipo === 'completo') {
      console.log(`${new Date().toISOString} ${req.method} ${req.url}`);
    } else {
      console.log(`${new Date().toISOString} ${req.url}`);
    }
    next();
  };
}

export default logger;
