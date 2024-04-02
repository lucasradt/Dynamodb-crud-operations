import "reflect-metadata";
interface ColumnMetadata {
    name: string;
    serializer?: unknown;
    deserializer?: unknown;
}
export declare const Column: (name: string, serializer?: unknown, deserializer?: unknown) => PropertyDecorator;
export declare function getColumn(target: unknown, property: string): string | ColumnMetadata;
export {};
