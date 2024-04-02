"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRepository = void 0;
const AWS = require("aws-sdk");
const uuid_1 = require("uuid");
const key_decorator_1 = require("./decorators/key-decorator");
const table_decorator_1 = require("./decorators/table-decorator");
const aws_dynamodb_config_1 = require("./infrastructure/utils/aws-dynamodb-config");
const aws_table_1 = require("./infrastructure/utils/aws-table");
const mapper_1 = require("./mapper");
class CrudRepository {
    constructor(entity) {
        this.entity = entity;
        const sample = new entity();
        this.mapper = new mapper_1.Mapper();
        this.key = (0, key_decorator_1.getKey)(sample);
        this.table = `${(0, table_decorator_1.getTable)(sample)}${(0, aws_table_1.getTableSuffix)()}`;
        this.db = new AWS.DynamoDB.DocumentClient((0, aws_dynamodb_config_1.configure)());
    }
    /**
     * Find data by id.
     * @param id Id.
     * @param consistentRead Defines whether the reading should be consistent.
     * @returns Data from table.
     */
    findOneById(id, consistentRead = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const Key = { [this.key]: id };
            try {
                const request = yield this.db
                    .get({
                    Key,
                    TableName: this.table,
                    ConsistentRead: consistentRead,
                })
                    .promise();
                if (!request.Item) {
                    console.log(`db:get(${this.table}) => id=${id} - Item não encontrado`);
                    return;
                }
                return this.mapper.fromItem(request.Item, this.entity);
            }
            catch (error) {
                console.error(`db:get(${this.table}) => id=${id} - Erro ao buscar na DynamoDB: ${error.message}`);
                throw error;
            }
        });
    }
    /**
     * Update data in the table.
     * @param item Data to be update in the table.
     * @returns Updated data.
     */
    update(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!item || !item.id) {
                console.error(`db:update(${this.table}) => Item ou id nulo`);
                return;
            }
            try {
                yield this.db
                    .put({
                    Item: this.mapper.toItem(item),
                    TableName: this.table,
                })
                    .promise();
                console.log(`db:update(${this.table}) => id=${item.id} - OK`);
                return item;
            }
            catch (error) {
                console.error(`db:update(${this.table}) => id=${item.id} - Erro DynamoDB: ${error.message}`);
                throw error;
            }
        });
    }
    /**
     * Create data in the table.
     * @param item Data to be created in the table.
     * @returns Created data.
     */
    insert(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!item.id) {
                item.id = (0, uuid_1.v4)();
            }
            try {
                yield this.db
                    .put({
                    Item: this.mapper.toItem(item),
                    TableName: this.table,
                })
                    .promise();
                console.log(`db:insert(${this.table}) => id=${item.id} - OK`);
                return item;
            }
            catch (err) {
                console.error(`db:insert(${this.table}) => id=${item.id} - Erro DynamoDB: ${err.message}`);
                throw err;
            }
        });
    }
    /**
     * Delete data from table.
     * @param item Data to be entered.
     * @returns Data entered.
     */
    delete(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!item || !item.id) {
                console.error(`db:delete(${this.table}) => item ou id nulo`);
                return;
            }
            const Key = { [this.key]: item.id };
            try {
                yield this.db
                    .delete({
                    Key,
                    TableName: this.table,
                })
                    .promise();
                console.log(`db:delete(${this.table}) => id=${item.id} - OK`);
            }
            catch (err) {
                console.error(`db:delete(${this.table}) => id=${item.id} - Erro DynamoDB: ${err.message}`);
                throw err;
            }
        });
    }
    /**
     * Find data from table by queryImput.
     * @param params QueryImput.
     * @returns List of data from table.
     */
    findByQuery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = [];
                let readNextPage;
                do {
                    const data = yield this.db.query(params).promise();
                    items.push(...data.Items);
                    readNextPage = data.LastEvaluatedKey ? true : false;
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                } while (readNextPage);
                return items.length > 0
                    ? items.map((Item) => this.mapper.fromItem(Item, this.entity))
                    : [];
            }
            catch (err) {
                console.error(`db:findByQuery(${this.table}) => Erro DynamoDB: ${err.message}`);
                throw err;
            }
        });
    }
}
exports.CrudRepository = CrudRepository;
//# sourceMappingURL=crud-repository.js.map