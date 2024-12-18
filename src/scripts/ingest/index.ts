#!/usr/bin/env node

import {
  ConsoleLogger,
  INestApplicationContext,
  LoggerService,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Collection } from 'mongodb';

import { AppModule } from '../../app/adapter/nest/modules/AppModule';
import { CardDb } from '../../cards/adapter/db/models/CardDb';
import { mongoCardCollectionSymbol } from '../../foundation/db/adapter/nest/models/mongoCardCollectionSymbol';
import { ingestLorcanaCards } from './ingestLorcanaCards';
import { ingestMtgCards } from './ingestMtgCards';

async function resetDb(
  cardsDbCollection: Collection<CardDb>,
  logger: LoggerService,
): Promise<void> {
  logger.log('Reseting card collection...');

  await cardsDbCollection.drop();

  // A migration manager would be included in a real world scenario
  await cardsDbCollection.createIndexes([
    {
      background: true,
      key: {
        kind: 1,
      },
      name: 'name_kind_1',
    },
    {
      background: true,
      key: {
        name: 'text',
      },
      name: 'name_text',
      sparse: true,
    },
    {
      background: true,
      key: {
        rarity: 1,
      },
      name: 'name_rarity_1',
      sparse: true,
    },
    {
      background: true,
      key: {
        inkCost: 1,
      },
      name: 'name_inkCost_1',
      sparse: true,
    },
    {
      background: true,
      key: {
        color: 1,
      },
      name: 'name_color_1',
      sparse: true,
    },
  ]);

  logger.log('Card collection reset!');
}

async function run(): Promise<void> {
  const logger: LoggerService = new ConsoleLogger();

  const nestJsApplicationContext: INestApplicationContext =
    await NestFactory.createApplicationContext(AppModule);

  const cardsDbCollection: Collection<CardDb> = nestJsApplicationContext.get(
    mongoCardCollectionSymbol,
  );

  await resetDb(cardsDbCollection, logger);

  await ingestLorcanaCards(cardsDbCollection, logger);
  await ingestMtgCards(cardsDbCollection, logger);

  await nestJsApplicationContext.close();
}

void run();
