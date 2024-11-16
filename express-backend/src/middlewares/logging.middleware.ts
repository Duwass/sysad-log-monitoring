import morgan from 'morgan';
import logger from '../logger';

// Stream for info logs
const infoStream = {
    write: (message: string) => {
        logger.info(message.trim());
    }
};

// Stream for error logs
const errorStream = {
    write: (message: string) => {
        logger.error(message.trim());
    }
};

// Middleware for logging all non-error requests
const infoLogging = morgan('combined', {
    skip: (req, res) => res.statusCode >= 400,
    stream: infoStream });

// Middleware for logging error requests, with status code >= 400
const errorLogging = morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
    stream: errorStream
});

export { infoLogging, errorLogging };