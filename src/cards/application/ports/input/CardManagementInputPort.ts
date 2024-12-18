import { Inject, Injectable } from '@nestjs/common';

import { Card } from '../../../domain/models/Card';
import { CardFindQuery } from '../../../domain/models/CardFindQuery';
import { CardSearchPort, cardSearchPortSymbol } from '../output/CardSearchPort';

@Injectable()
export class CardManagementInputPort {
  readonly #cardSearchPort: CardSearchPort;

  constructor(
    @Inject(cardSearchPortSymbol)
    cardSearchPort: CardSearchPort,
  ) {
    this.#cardSearchPort = cardSearchPort;
  }

  public async search(cardFindQuery: CardFindQuery): Promise<Card[]> {
    return this.#cardSearchPort.find(cardFindQuery);
  }
}
