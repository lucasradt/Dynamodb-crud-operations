"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKey = exports.Key = void 0;
require("reflect-metadata");
const column_decorator_1 = require("./column-decorator");
const ID_METADATA_KEY = Symbol("id");
const Key = () => {
    return (target, property) => {
        const construct = target.constructor;
        const metadata = Reflect.getMetadata(ID_METADATA_KEY, construct) ?? {};
        metadata[ID_METADATA_KEY] = (0, column_decorator_1.getColumn)(target, property.toString())['name'];
        Reflect.defineMetadata(ID_METADATA_KEY, metadata, construct);
    };
};
exports.Key = Key;
function getKey(target) {
    const construct = target.constructor;
    const metadata = Reflect.getMetadata(ID_METADATA_KEY, construct) ?? {};
    return (metadata[ID_METADATA_KEY] ?? (0, column_decorator_1.getColumn)(target, "id")['name']);
}
exports.getKey = getKey;
//# sourceMappingURL=key-decorator.js.map