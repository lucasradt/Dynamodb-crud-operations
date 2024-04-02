"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTable = exports.Table = void 0;
require("reflect-metadata");
const TABLE_METADATA_KEY = Symbol("table");
const Table = (tableName) => (construct) => {
    var _a;
    const metadata = (_a = Reflect.getMetadata(TABLE_METADATA_KEY, construct)) !== null && _a !== void 0 ? _a : {};
    metadata[TABLE_METADATA_KEY] = tableName;
    Reflect.defineMetadata(TABLE_METADATA_KEY, metadata, construct);
};
exports.Table = Table;
function getTable(target) {
    var _a, _b;
    const construct = target.constructor;
    const metadata = (_a = Reflect.getMetadata(TABLE_METADATA_KEY, construct)) !== null && _a !== void 0 ? _a : {};
    return (_b = metadata[TABLE_METADATA_KEY]) !== null && _b !== void 0 ? _b : null; // Use null ou um valor padrão apropriado
}
exports.getTable = getTable;
//# sourceMappingURL=table-decorator.js.map