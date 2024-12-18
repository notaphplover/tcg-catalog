import { BaseCard } from './BaseCard';
import { CardKind } from './CardKind';

export enum MtgCardColor {
  blue = 'U',
  black = 'B',
  gree = 'G',
  red = 'R',
  white = 'W',
}

export enum MtgCardRariry {
  common = 'common',
  mythic = 'mythic',
  rare = 'rare',
  special = 'special',
  uncommon = 'uncommon',
}

export interface MtgCard extends BaseCard<CardKind.mtg> {
  name: string;
  color: MtgCardColor | undefined;
  rarity: MtgCardRariry;
}
