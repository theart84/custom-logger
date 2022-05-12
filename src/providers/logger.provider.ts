import { Provider, Type } from '@nestjs/common';
import {
  LoggerModuleAsyncOptions,
  LoggerModuleFactory,
  LoggerModuleOptions,
} from '../interfaces/logger.interface';
import { LOGGER_MODULE_OPTIONS } from '../constants/logger.constant';
import { MongoClient } from 'mongodb';

export const createConnectionFactory = (
  options: LoggerModuleOptions,
): MongoClient => new MongoClient(options.url, options.mongoClientOptions);

export function createLoggerProvider(options: LoggerModuleOptions): Provider {
  return {
    provide: LOGGER_MODULE_OPTIONS,
    useValue: createConnectionFactory(options),
  };
}

export function createAsyncOptionsProvider(
  options: LoggerModuleAsyncOptions,
): Provider {
  if (options.useFactory) {
    return {
      provide: LOGGER_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }

  const inject = [
    (options.useClass || options.useExisting) as Type<LoggerModuleFactory>,
  ];

  return {
    provide: LOGGER_MODULE_OPTIONS,
    useFactory: async (optionsFactory: LoggerModuleFactory) =>
      optionsFactory.createFetchDataModuleOptions(),
    inject,
  };
}

export function createAsyncProviders(
  options: LoggerModuleAsyncOptions,
): Provider[] {
  if (options.useExisting || options.useFactory) {
    return [createAsyncOptionsProvider(options)];
  }

  const useClass = options.useClass as Type<LoggerModuleFactory>;

  return [
    createAsyncOptionsProvider(options),
    {
      provide: useClass,
      useClass,
    },
  ];
}
