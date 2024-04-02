import "reflect-metadata";

const TABLE_METADATA_KEY = Symbol("table");

export const Table =
  (tableName: string): ClassDecorator =>
  (construct) => {
    const metadata: Record<symbol, string> =
      Reflect.getMetadata(TABLE_METADATA_KEY, construct) ?? {};
    metadata[TABLE_METADATA_KEY] = tableName;
    Reflect.defineMetadata(TABLE_METADATA_KEY, metadata, construct);
  };

export function getTable(target: unknown): string {
  const construct = target.constructor;
  const metadata: Record<symbol, string> =
    Reflect.getMetadata(TABLE_METADATA_KEY, construct) ?? {};

  return metadata[TABLE_METADATA_KEY] ?? null; // Use null ou um valor padrão apropriado
}
