import { BaseCard } from './BaseCard';
import { CardKind } from './CardKind';

export enum LorcanaCardRarity {
  common = 'common',
  enchanted = 'enchanted',
  legendary = 'legendary',
  promo = 'promo',
  rare = 'rare',
  superRare = 'superRare',
  uncommon = 'uncommon',
}

export interface LorcanaCard extends BaseCard<CardKind.lorcana> {
  name: string;
  rarity: LorcanaCardRarity;
  inkCost: number;
}
