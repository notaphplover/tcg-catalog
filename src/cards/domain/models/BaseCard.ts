import { CardKind } from './CardKind';

export interface BaseCard<TCardKind extends CardKind> {
  id: string;
  kind: TCardKind;
}
