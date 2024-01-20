export const removeDuplicates = <T extends Record<B, C>, B extends keyof T, C = T[B]>(
  array: T[],
  field: B,
): T[] =>
  Object.values(
    array.reduce(
      (acc, value) =>
        ({
          ...acc,
          [value[field] as string]: value,
        }) as Record<string, T>,
      {} as Record<string, T>,
    ),
  );
