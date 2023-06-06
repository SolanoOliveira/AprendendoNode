import { Request, Response, NextFunction } from 'express';
import { Tipo } from './loggerTypes';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

interface LogFormat {
  timestamp: string;
  url: string;
  method: string;
  httpVersion?: string;
  userAgent?: string;
}

function accessLogger(format: Tipo) {
  return (req: Request, res: Response, next: NextFunction) => {
    const logFilePath = process.env.PATH_FILE_LOG ?? './logs/access.log';

    const logData: LogFormat = {
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
    };

    if (format === 'completo') {
      logData.httpVersion = req.httpVersion;
      logData.userAgent = req.headers['user-agent'];
    }

    const logEntry =
      `${logData.timestamp} | ${logData.url} | ${logData.method}` +
      (logData.httpVersion ? ` | ${logData.httpVersion}` : '') +
      (logData.userAgent ? ` | ${logData.userAgent}` : '');

    fs.appendFile(logFilePath, logEntry + '\n', (err) => {
      if (err) {
        console.error('Erro ao salvar o log de acesso:', err);
      }
    });

    next();
  };
}

export default accessLogger;
