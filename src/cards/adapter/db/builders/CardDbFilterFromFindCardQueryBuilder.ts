import { Inject, Injectable } from '@nestjs/common';
import { Filter } from 'mongodb';

import { Builder } from '../../../../foundation/common/modules/Builder';
import { KeyOfUnion } from '../../../../foundation/common/types/KeyOfUnion';
import { CardFindQuery } from '../../../domain/models/CardFindQuery';
import { AnyCardFindQueryFilter } from '../../../domain/models/CardFindQueryFilter';
import { CardDb } from '../models/CardDb';
import { CardDbFilterFromCardQueryFilterBuilder } from './CardDbFilterFromCardQueryFilterBuilder';

@Injectable()
export class CardDbFilterFromFindCardQueryBuilder
  implements Builder<Filter<CardDb>, [CardFindQuery]>
{
  readonly #mongoCardDbFilterFromCardQueryFilterBuilder: Builder<
    Filter<CardDb>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [KeyOfUnion<CardDb>, AnyCardFindQueryFilter<any>]
  >;

  constructor(
    @Inject(CardDbFilterFromCardQueryFilterBuilder)
    mongoCardDbFilterFromCardQueryFilterBuilder: Builder<
      Filter<CardDb>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [KeyOfUnion<CardDb>, AnyCardFindQueryFilter<any>]
    >,
  ) {
    this.#mongoCardDbFilterFromCardQueryFilterBuilder =
      mongoCardDbFilterFromCardQueryFilterBuilder;
  }

  public build(cardFindQuery: CardFindQuery): Filter<CardDb> {
    const cardDbFilters: Filter<CardDb>[] = [];

    if (cardFindQuery.color !== undefined) {
      cardDbFilters.push(
        this.#mongoCardDbFilterFromCardQueryFilterBuilder.build(
          'color',
          cardFindQuery.color as AnyCardFindQueryFilter<string>,
        ),
      );
    }

    if (cardFindQuery.inkCost !== undefined) {
      cardDbFilters.push(
        this.#mongoCardDbFilterFromCardQueryFilterBuilder.build(
          'inkCost',
          cardFindQuery.inkCost as AnyCardFindQueryFilter<number>,
        ),
      );
    }

    if (cardFindQuery.kind !== undefined) {
      cardDbFilters.push(
        this.#mongoCardDbFilterFromCardQueryFilterBuilder.build(
          'kind',
          cardFindQuery.kind as AnyCardFindQueryFilter<string>,
        ),
      );
    }

    if (cardFindQuery.name !== undefined) {
      cardDbFilters.push(
        this.#mongoCardDbFilterFromCardQueryFilterBuilder.build(
          'name',
          cardFindQuery.name as AnyCardFindQueryFilter<string>,
        ),
      );
    }

    if (cardFindQuery.rarity !== undefined) {
      cardDbFilters.push(
        this.#mongoCardDbFilterFromCardQueryFilterBuilder.build(
          'rarity',
          cardFindQuery.rarity as AnyCardFindQueryFilter<string>,
        ),
      );
    }

    return {
      $and: cardDbFilters,
    };
  }
}
