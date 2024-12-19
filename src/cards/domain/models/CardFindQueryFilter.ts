export enum CardFindQueryFilterKind {
  and = 'and',
  list = 'list',
  null = 'null',
  or = 'or',
  range = 'range',
  text = 'text',
  value = 'value',
}

export interface BaseCardFindQueryFilter<
  TKind extends CardFindQueryFilterKind,
> {
  kind: TKind;
}

export interface CardFindQueryAndFilter<
  TFilter extends BaseCardFindQueryFilter<CardFindQueryFilterKind>,
> extends BaseCardFindQueryFilter<CardFindQueryFilterKind.and> {
  filters: TFilter[];
}

export interface CardFindQueryListFilter<T>
  extends BaseCardFindQueryFilter<CardFindQueryFilterKind.list> {
  values: T[];
}

export type CardFindQueryNullFilter =
  BaseCardFindQueryFilter<CardFindQueryFilterKind.null>;

export interface CardFindQueryOrFilter<
  TFilter extends BaseCardFindQueryFilter<CardFindQueryFilterKind>,
> extends BaseCardFindQueryFilter<CardFindQueryFilterKind.or> {
  filters: TFilter[];
}

export interface CardFindQueryRangeFilter<T>
  extends BaseCardFindQueryFilter<CardFindQueryFilterKind.range> {
  min: {
    exclude: boolean;
    value: T;
  };
  max: {
    exclude: boolean;
    value: T;
  };
}

export interface CardFindQueryTextFilter
  extends BaseCardFindQueryFilter<CardFindQueryFilterKind.text> {
  value: string;
}

export interface CardFindQueryValueFilter<T>
  extends BaseCardFindQueryFilter<CardFindQueryFilterKind.value> {
  value: T;
}

export type CardFindNumberEnumQueryFilter =
  | CardFindQueryAndFilter<CardFindNumberEnumQueryFilter>
  | CardFindQueryListFilter<number>
  | CardFindQueryOrFilter<CardFindNumberEnumQueryFilter>
  | CardFindQueryRangeFilter<number>
  | CardFindQueryValueFilter<number>;

export type CardFindStringEnumQueryFilter<T extends string = string> =
  | CardFindQueryAndFilter<CardFindStringEnumQueryFilter<T>>
  | CardFindQueryListFilter<T>
  | CardFindQueryOrFilter<CardFindStringEnumQueryFilter<T>>
  | CardFindQueryValueFilter<T>;

export type CardFindOptionalStringEnumQueryFilter<T extends string = string> =
  | CardFindQueryAndFilter<CardFindOptionalStringEnumQueryFilter<T>>
  | CardFindQueryListFilter<T>
  | CardFindQueryNullFilter
  | CardFindQueryOrFilter<CardFindOptionalStringEnumQueryFilter<T>>
  | CardFindQueryValueFilter<T>;

export type AnyCardFindQueryFilter<T> =
  | CardFindQueryAndFilter<AnyCardFindQueryFilter<T>>
  | CardFindQueryListFilter<T>
  | CardFindQueryNullFilter
  | CardFindQueryOrFilter<AnyCardFindQueryFilter<T>>
  | CardFindQueryRangeFilter<T>
  | CardFindQueryTextFilter
  | CardFindQueryValueFilter<number>;
