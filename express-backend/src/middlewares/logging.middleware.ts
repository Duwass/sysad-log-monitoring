import morgan from 'morgan';
import logger from '../logger';

const stream = {
    write: (message: string) => {
        logger.info(message.trim());
    }
};

const loggingMiddleware = morgan('combined', {stream});
export default loggingMiddleware;