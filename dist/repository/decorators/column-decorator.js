"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumn = exports.Column = void 0;
require("reflect-metadata");
const COLUMN_METADATA_KEY = Symbol("column");
const Column = (name, serializer, deserializer) => {
    return (target, property) => {
        var _a;
        const construct = target.constructor;
        const metadata = (_a = Reflect.getMetadata(COLUMN_METADATA_KEY, construct)) !== null && _a !== void 0 ? _a : {};
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
    var _a;
    const construct = target.constructor;
    const metadata = (_a = Reflect.getMetadata(COLUMN_METADATA_KEY, construct)) !== null && _a !== void 0 ? _a : {};
    return metadata[property] ? metadata[property] : property;
}
exports.getColumn = getColumn;
//# sourceMappingURL=column-decorator.js.map