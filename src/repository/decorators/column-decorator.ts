import "reflect-metadata";

const COLUMN_METADATA_KEY = Symbol("column");

interface ColumnMetadata {
  name: string;
  serializer?: unknown;
  deserializer?: unknown;
}

export const Column = (
  name: string,
  serializer?: unknown,
  deserializer?: unknown
): PropertyDecorator => {
  return (target, property) => {
    const construct = target.constructor;
    const metadata: Record<string, ColumnMetadata> =
      Reflect.getMetadata(COLUMN_METADATA_KEY, construct) ?? {};

    metadata[property as string] = {
      deserializer,
      name,
      serializer,
    };

    Reflect.defineMetadata(COLUMN_METADATA_KEY, metadata, construct);
  };
};

export function getColumn(
  target: unknown,
  property: string
): string | ColumnMetadata {
  const construct = target.constructor;
  const metadata: Record<string, ColumnMetadata> =
    Reflect.getMetadata(COLUMN_METADATA_KEY, construct) ?? {};

  return metadata[property] ?? property;
}
