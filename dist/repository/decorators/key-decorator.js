"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKey = exports.Key = void 0;
require("reflect-metadata");
const column_decorator_1 = require("./column-decorator");
const ID_METADATA_KEY = Symbol("id");
const Key = (target, property) => {
    var _a;
    const construct = target.constructor;
    const metadata = (_a = Reflect.getMetadata(ID_METADATA_KEY, construct)) !== null && _a !== void 0 ? _a : {};
    metadata[ID_METADATA_KEY] = (0, column_decorator_1.getColumn)(target, property.toString())
        .valueOf()
        .toString();
    Reflect.defineMetadata(ID_METADATA_KEY, metadata, construct);
};
exports.Key = Key;
function getKey(target) {
    var _a, _b;
    const construct = target.constructor;
    const metadata = (_a = Reflect.getMetadata(ID_METADATA_KEY, construct)) !== null && _a !== void 0 ? _a : {};
    return ((_b = metadata[ID_METADATA_KEY]) !== null && _b !== void 0 ? _b : (0, column_decorator_1.getColumn)(target, "id").valueOf().toString());
}
exports.getKey = getKey;
//# sourceMappingURL=key-decorator.js.map