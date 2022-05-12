import {
  LoggerBody,
  LoggerModuleOptions,
} from '../interfaces/logger.interface';
import { MongoClient, MongoClientOptions } from 'mongodb';
import { LoggerDecorator } from '../decorators/logger.decorator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly url: string;

  private readonly dbName: string;

  private readonly collectionName: string;

  private readonly mongoClientOptions?: MongoClientOptions;

  private client: MongoClient;

  constructor(
    @LoggerDecorator() private readonly options: LoggerModuleOptions,
  ) {
    this.url = options.url;
    this.dbName = options.dbName;
    this.collectionName = options.collectionName;
    this.mongoClientOptions = options.mongoClientOptions || {};
    this.client = new MongoClient(this.url, this.mongoClientOptions);
    this.connectToDb();
  }

  private async connectToDb() {
    try {
      await this.client.connect();
      console.log('Connected successfully to server');
    } catch (e) {
      console.error('MongoConnect error', e);
    }
  }

  public async log(body: LoggerBody) {
    await this.client
      .db(this.dbName)
      .collection(this.collectionName)
      .insertOne({
        type: 'log',
        ...body,
      });
  }

  public async error(body: LoggerBody) {
    await this.client
      .db(this.dbName)
      .collection(this.collectionName)
      .insertOne({
        type: 'error',
        ...body,
      });
  }

  public async info(body: LoggerBody) {
    await this.client
      .db(this.dbName)
      .collection(this.collectionName)
      .insertOne({
        type: 'info',
        ...body,
      });
  }

  public async warn(body: LoggerBody) {
    await this.client
      .db(this.dbName)
      .collection(this.collectionName)
      .insertOne({
        type: 'warn',
        ...body,
      });
  }
}
