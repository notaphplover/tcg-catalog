import fs from 'node:fs/promises';

import { LoggerService } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';

import { CardDb } from '../../cards/adapter/db/models/CardDb';
import { CardKind } from '../../cards/domain/models/CardKind';
import { LorcanaCardRarity } from '../../cards/domain/models/LorcanaCard';
import { AppError } from '../../error/domain/models/AppError';
import { AppErrorKind } from '../../error/domain/models/AppErrorKind';
import { isStringEnumValue } from './isStringEnumValue';

const CARD_CHUNK_SIZE: number = 1000;

const LORCANA_DATA_PATH: string = './data/lorcana-cards.json';

interface LorcanaCardData {
  id: string;
  ink_cost: number;
  name: string;
  rarity: string;
}

enum LorcanaCardDataRarity {
  common = 'Common',
  enchanted = 'Enchanted',
  legendary = 'Legendary',
  promo = 'Promo',
  rare = 'Rare',
  superRare = 'Super Rare',
  uncommon = 'Uncommon',
}

const dataRarityToRarityMap: {
  [TKey in LorcanaCardDataRarity]: LorcanaCardRarity;
} = {
  [LorcanaCardDataRarity.common]: LorcanaCardRarity.common,
  [LorcanaCardDataRarity.enchanted]: LorcanaCardRarity.enchanted,
  [LorcanaCardDataRarity.legendary]: LorcanaCardRarity.legendary,
  [LorcanaCardDataRarity.promo]: LorcanaCardRarity.promo,
  [LorcanaCardDataRarity.rare]: LorcanaCardRarity.rare,
  [LorcanaCardDataRarity.superRare]: LorcanaCardRarity.superRare,
  [LorcanaCardDataRarity.uncommon]: LorcanaCardRarity.uncommon,
};

function buildLorcanaCardDb(card: LorcanaCardData): CardDb {
  if (!isLorcanaRarity(card.rarity)) {
    throw new AppError(
      AppErrorKind.contractViolation,
      `Unexpected card rarity "${card.rarity}" when parsing Lorcana dataset`,
    );
  }

  return {
    _id: new ObjectId(),
    inkCost: card.ink_cost,
    kind: CardKind.lorcana,
    name: card.name,
    rarity: dataRarityToRarityMap[card.rarity],
  };
}

const isLorcanaRarity: (value: string) => value is LorcanaCardDataRarity =
  isStringEnumValue(LorcanaCardDataRarity);

export async function ingestLorcanaCards(
  collection: Collection<CardDb>,
  logger: LoggerService,
): Promise<void> {
  logger.log('Ingesting Lorcana cards...');

  const cardDataList: LorcanaCardData[] = JSON.parse(
    (await fs.readFile(LORCANA_DATA_PATH)).toString(),
  ) as LorcanaCardData[];

  const cardDbList: CardDb[] = cardDataList.map(buildLorcanaCardDb);

  logger.log(`Loaded ${cardDbList.length.toString()} cards from the dataset`);

  for (let i: number = 0; i < cardDbList.length; i += CARD_CHUNK_SIZE) {
    const cardDbChunk: CardDb[] = cardDbList.slice(i, i + CARD_CHUNK_SIZE);

    await collection.insertMany(cardDbChunk);

    logger.log(`Chunk from index ${i.toString()} has been loaded`);
  }

  logger.log('Lorcana cards have been successfully ingested');
}
