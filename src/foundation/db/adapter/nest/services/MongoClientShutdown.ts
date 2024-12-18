import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { MongoClient } from 'mongodb';

import { mongoClientSymbol } from '../models/mongoClientSymbol';

@Injectable()
export class MongoClientShutdown implements OnModuleDestroy {
  readonly #client: MongoClient;

  constructor(
    @Inject(mongoClientSymbol)
    client: MongoClient,
  ) {
    this.#client = client;
  }

  public async onModuleDestroy(): Promise<void> {
    await this.#client.close();
  }
}
