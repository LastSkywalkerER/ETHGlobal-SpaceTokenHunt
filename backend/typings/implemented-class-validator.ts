export type ImplementedClassValidator<Class, ImplementedInterface> =
  Class extends ImplementedInterface
    ? Exclude<keyof Class, keyof ImplementedInterface> extends never
      ? Class
      : never
    : never;
