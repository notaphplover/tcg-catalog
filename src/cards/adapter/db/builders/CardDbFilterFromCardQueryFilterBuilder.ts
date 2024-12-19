import { Injectable } from '@nestjs/common';
import { Filter, FilterOperators } from 'mongodb';

import { Builder } from '../../../../foundation/common/modules/Builder';
import { KeyOfUnion } from '../../../../foundation/common/types/KeyOfUnion';
import {
  AnyCardFindQueryFilter,
  CardFindQueryFilterKind,
} from '../../../domain/models/CardFindQueryFilter';
import { CardDb } from '../models/CardDb';

@Injectable()
export class CardDbFilterFromCardQueryFilterBuilder<T>
  implements
    Builder<Filter<CardDb>, [KeyOfUnion<CardDb>, AnyCardFindQueryFilter<T>]>
{
  public build(
    property: KeyOfUnion<CardDb>,
    filter: AnyCardFindQueryFilter<T>,
  ): Filter<CardDb> {
    switch (filter.kind) {
      case CardFindQueryFilterKind.and:
        return {
          $and: filter.filters.map((filter: AnyCardFindQueryFilter<T>) =>
            this.build(property, filter),
          ),
        };
      case CardFindQueryFilterKind.list:
        return {
          [property]: {
            $in: filter.values,
          },
        };
      case CardFindQueryFilterKind.null:
        return {
          $or: [
            {
              [property]: { $exists: false },
            },
            {
              [property]: null,
            },
          ],
        };
      case CardFindQueryFilterKind.or:
        return {
          $or: filter.filters.map((filter: AnyCardFindQueryFilter<T>) =>
            this.build(property, filter),
          ),
        };
      case CardFindQueryFilterKind.range: {
        const propertyFilter: FilterOperators<T> = {};

        if (filter.max.exclude) {
          propertyFilter.$lt = filter.max.value;
        } else {
          propertyFilter.$lte = filter.max.value;
        }

        if (filter.min.exclude) {
          propertyFilter.$gt = filter.min.value;
        } else {
          propertyFilter.$gte = filter.min.value;
        }

        return {
          [property]: propertyFilter,
        };
      }
      case CardFindQueryFilterKind.text:
        return {
          $text: {
            $search: `"${filter.value}"`,
          },
        };
      case CardFindQueryFilterKind.value:
        return {
          [property]: filter.value,
        };
    }
  }
}
