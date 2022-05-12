import { Inject } from '@nestjs/common';
import { LOGGER_MODULE_OPTIONS } from '../constants/logger.constant';

export const LoggerDecorator = () => Inject(LOGGER_MODULE_OPTIONS);
