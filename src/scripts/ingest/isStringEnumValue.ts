export function isStringEnumValue<T extends string>(
  enumType: Record<string, T>,
): (value: string) => value is T {
  return (value: string): value is T =>
    Object.values<string>(enumType).includes(value);
}
