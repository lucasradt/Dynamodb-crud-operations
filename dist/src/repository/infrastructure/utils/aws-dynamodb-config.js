"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
function configure() {
    const { REGION, DYNAMO_ENDPOINT } = process.env;
    return {
        endpoint: DYNAMO_ENDPOINT,
        region: REGION,
    };
}
exports.configure = configure;
//# sourceMappingURL=aws-dynamodb-config.js.map