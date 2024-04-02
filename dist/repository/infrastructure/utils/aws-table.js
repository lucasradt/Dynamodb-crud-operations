"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableSuffix = void 0;
function getTableSuffix() {
    const { ENV, ENV_REPOSITORY } = process.env;
    if (ENV && ENV_REPOSITORY === "true") {
        return `-${ENV}`;
    }
    return ``;
}
exports.getTableSuffix = getTableSuffix;
//# sourceMappingURL=aws-table.js.map