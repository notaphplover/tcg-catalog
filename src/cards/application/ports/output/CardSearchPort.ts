import { SearchPort } from '../../../../foundation/db/application/ports/output/SearchPort';
import { Card } from '../../../domain/models/Card';
import { CardFindQuery } from '../../../domain/models/CardFindQuery';

export type CardSearchPort = SearchPort<Card, CardFindQuery>;

export const cardSearchPortSymbol: symbol = Symbol.for(
  'tcg-catalog/CardSearchPort',
);
