import { Injectable } from '@nestjs/common';

import { Builder } from '../../../../foundation/common/modules/Builder';
import { Card } from '../../../domain/models/Card';
import { CardDb } from '../models/CardDb';

@Injectable()
export class CardFromCardDbBuilder implements Builder<Card, [CardDb]> {
  public build(cardDb: CardDb): Card {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, ...rest }: CardDb = cardDb;

    return {
      id: _id.toString(),
      ...rest,
    };
  }
}
