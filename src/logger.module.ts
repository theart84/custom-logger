import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  LoggerModuleAsyncOptions,
  LoggerModuleOptions,
} from './interfaces/logger.interface';
import {
  createLoggerProvider,
  createConnectionFactory,
  createAsyncProviders,
} from './providers/logger.provider';
import {
  LOGGER_MODULE_OPTIONS,
  LOGGER_TOKEN,
} from './constants/logger.constant';
import { LoggerService } from './services/logger.service';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerModuleOptions): DynamicModule {
    const provider: Provider = createLoggerProvider(options);
    return {
      module: LoggerModule,
      providers: [provider],
      exports: [provider],
    };
  }

  static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    const provider: Provider = {
      inject: [LOGGER_MODULE_OPTIONS],
      provide: LOGGER_TOKEN,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      useFactory: async (options: LoggerModuleOptions) =>
        createConnectionFactory(options),
    };

    const asyncProviders = createAsyncProviders(options);
    return {
      module: LoggerModule,
      imports: options.imports ?? [],
      providers: [...asyncProviders, provider, LoggerService],
      exports: [provider, LoggerService],
    };
  }
}
