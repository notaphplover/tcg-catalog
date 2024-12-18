import fs from 'node:fs/promises';

import { LoggerService } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';

import { CardDb } from '../../cards/adapter/db/models/CardDb';
import { CardKind } from '../../cards/domain/models/CardKind';
import { MtgCardColor, MtgCardRariry } from '../../cards/domain/models/MtgCard';
import { AppError } from '../../error/domain/models/AppError';
import { AppErrorKind } from '../../error/domain/models/AppErrorKind';
import { isStringEnumValue } from './isStringEnumValue';

interface MtgCardData {
  color: string | undefined;
  id: string;
  name: string;
  rarity: string;
}

const CARD_CHUNK_SIZE: number = 1000;

const MTG_DATA_PATH: string = './data/mtg-cards.json';

function buildMtgCardDb(card: MtgCardData): CardDb {
  if (card.color !== undefined && !isMtgColor(card.color)) {
    throw new AppError(
      AppErrorKind.contractViolation,
      `Unexpected card color "${card.color}" when parsing mtg dataset`,
    );
  }

  if (!isMtgRarity(card.rarity)) {
    throw new AppError(
      AppErrorKind.contractViolation,
      `Unexpected card rarity "${card.rarity}" when parsing mtg dataset`,
    );
  }

  return {
    _id: new ObjectId(),
    color: card.color,
    kind: CardKind.mtg,
    name: card.name,
    rarity: card.rarity,
  };
}

const isMtgColor: (value: string) => value is MtgCardColor =
  isStringEnumValue(MtgCardColor);

const isMtgRarity: (value: string) => value is MtgCardRariry =
  isStringEnumValue(MtgCardRariry);

export async function ingestMtgCards(
  collection: Collection<CardDb>,
  logger: LoggerService,
) {
  logger.log('Ingesting MTG cards...');

  const cardDataList: MtgCardData[] = JSON.parse(
    (await fs.readFile(MTG_DATA_PATH)).toString(),
  ) as MtgCardData[];

  const cardDbList: CardDb[] = cardDataList.map(buildMtgCardDb);

  logger.log(`Loaded ${cardDbList.length.toString()} cards from the dataset`);

  for (let i: number = 0; i < cardDbList.length; i += CARD_CHUNK_SIZE) {
    const cardDbChunk: CardDb[] = cardDbList.slice(i, i + CARD_CHUNK_SIZE);

    await collection.insertMany(cardDbChunk);

    logger.log(`Chunk from index ${i.toString()} has been loaded`);
  }

  logger.log('MTG cards have been successfully ingested');
}
