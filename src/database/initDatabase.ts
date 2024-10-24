import logger from '../config/logger.config';
import { AppDataSource } from './dataSource';

export const initializeDatabase = async (): Promise<void> => {
	logger.info('Connecting to database...');

	await AppDataSource.initialize()
		.then(async () => {
			logger.info('Database connection success.');
		})
		.catch((error: any) => {
			/* istanbul ignore next */
			throw error;
		});
};
