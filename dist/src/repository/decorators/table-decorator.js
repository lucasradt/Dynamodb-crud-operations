"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTable = exports.Table = void 0;
require("reflect-metadata");
const TABLE_METADATA_KEY = Symbol("table");
const Table = (tableName) => (construct) => {
    const metadata = Reflect.getMetadata(TABLE_METADATA_KEY, construct) ?? {};
    metadata[TABLE_METADATA_KEY] = tableName;
    Reflect.defineMetadata(TABLE_METADATA_KEY, metadata, construct);
};
exports.Table = Table;
function getTable(target) {
    const construct = target.constructor;
    const metadata = Reflect.getMetadata(TABLE_METADATA_KEY, construct) ?? {};
    return metadata[TABLE_METADATA_KEY] ?? null; // Use null ou um valor padrão apropriado
}
exports.getTable = getTable;
//# sourceMappingURL=table-decorator.js.map