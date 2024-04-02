import "reflect-metadata";
import { getColumn } from "./column-decorator";

const ID_METADATA_KEY = Symbol("id");

export const Key = (): PropertyDecorator => {
  return (target, property) => {
    const construct = target.constructor;
    const metadata: Record<symbol, string> =
      Reflect.getMetadata(ID_METADATA_KEY, construct) ?? {};

    metadata[ID_METADATA_KEY] = getColumn(target, property.toString())['name'];
    Reflect.defineMetadata(ID_METADATA_KEY, metadata, construct);
  };
};

export function getKey(target: unknown): string {
  const construct = target.constructor;
  const metadata: Record<symbol, string> =
    Reflect.getMetadata(ID_METADATA_KEY, construct) ?? {};

  return (
    metadata[ID_METADATA_KEY] ?? getColumn(target, "id")['name']
  );
}
