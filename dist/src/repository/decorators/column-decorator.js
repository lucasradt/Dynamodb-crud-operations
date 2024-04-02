"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumn = exports.Column = void 0;
require("reflect-metadata");
const COLUMN_METADATA_KEY = Symbol("column");
const Column = (name, serializer, deserializer) => {
    return (target, property) => {
        const construct = target.constructor;
        const metadata = Reflect.getMetadata(COLUMN_METADATA_KEY, construct) ?? {};
        metadata[property] = {
            deserializer,
            name,
            serializer,
        };
        Reflect.defineMetadata(COLUMN_METADATA_KEY, metadata, construct);
    };
};
exports.Column = Column;
function getColumn(target, property) {
    const construct = target.constructor;
    const metadata = Reflect.getMetadata(COLUMN_METADATA_KEY, construct) ?? {};
    return metadata[property] ?? property;
}
exports.getColumn = getColumn;
//# sourceMappingURL=column-decorator.js.map