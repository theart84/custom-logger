import { ModuleMetadata, Type } from '@nestjs/common';
import { MongoClientOptions } from 'mongodb';

export interface LoggerBody {
  source: string;
  original_url: string;
  query: string;
  headers: {
    [key: string]: string;
  };
  body?: any;
  timestamp: Date;
}

export interface LoggerModuleOptions {
  url: string;
  dbName: string;
  collectionName: string;
  mongoClientOptions?: MongoClientOptions;
}

export interface LoggerModuleFactory {
  createFetchDataModuleOptions: () =>
    | Promise<LoggerModuleOptions>
    | LoggerModuleOptions;
}

export interface LoggerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<LoggerModuleFactory>;
  useExisting?: Type<LoggerModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<LoggerModuleOptions> | LoggerModuleOptions;
}
