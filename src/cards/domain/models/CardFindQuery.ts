import { PaginationQuery } from '../../../foundation/db/domain/models/PaginationQuery';
import {
  CardFindNumberEnumQueryFilter,
  CardFindOptionalStringEnumQueryFilter,
  CardFindQueryTextFilter,
  CardFindStringEnumQueryFilter,
} from './CardFindQueryFilter';

export interface CardFindQuery extends PaginationQuery {
  color?: CardFindOptionalStringEnumQueryFilter | undefined;
  inkCost?: CardFindNumberEnumQueryFilter | undefined;
  kind?: CardFindStringEnumQueryFilter | undefined;
  name?: CardFindQueryTextFilter | undefined;
  rarity?: CardFindStringEnumQueryFilter | undefined;
}
