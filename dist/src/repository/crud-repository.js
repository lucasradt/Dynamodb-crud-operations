"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRepository = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const uuid_1 = require("uuid");
const key_decorator_1 = require("./decorators/key-decorator");
const table_decorator_1 = require("./decorators/table-decorator");
const aws_dynamodb_config_1 = require("./infrastructure/utils/aws-dynamodb-config");
const aws_table_1 = require("./infrastructure/utils/aws-table");
const mapper_1 = require("./mapper");
class CrudRepository {
    entity;
    mapper;
    key;
    table;
    db;
    constructor(entity) {
        this.entity = entity;
        const sample = new entity();
        this.mapper = new mapper_1.Mapper();
        this.key = (0, key_decorator_1.getKey)(sample);
        this.table = `${(0, table_decorator_1.getTable)(sample)}${(0, aws_table_1.getTableSuffix)()}`;
        // this.db = new AWS.DynamoDB.DocumentClient(configure());
        this.db = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient((0, aws_dynamodb_config_1.configure)()));
    }
    /**
     * Find data by id.
     * @param id Id.
     * @param consistentRead Defines whether the reading should be consistent.
     * @returns Data from table.
     */
    async findOneById(id, consistentRead = false) {
        const keyValue = { [this.key]: id };
        const params = {
            Key: keyValue,
            TableName: this.table,
            ConsistentRead: consistentRead,
        };
        const getCommand = new lib_dynamodb_1.GetCommand(params);
        try {
            const response = await this.db.send(getCommand);
            if (!response.Item) {
                console.log(`db:get(${this.table}) => id=${id} - Item não encontrado`);
                return;
            }
            return this.mapper.fromItem(response.Item, this.entity);
        }
        catch (error) {
            console.error(`db:get(${this.table}) => id=${id} - Erro ao buscar na DynamoDB: ${error.message}`);
            throw error;
        }
    }
    /**
     * Update data in the table.
     * @param item Data to be update in the table.
     * @returns Updated data.
     */
    async update(item) {
        if (!item || !item.id) {
            console.error(`db:update(${this.table}) => Item ou id nulo`);
            return;
        }
        const keyValue = { [this.key]: item.id };
        const params = {
            Key: keyValue,
            TableName: this.table,
            Item: this.mapper.toItem(item),
        };
        const updateCommand = new lib_dynamodb_1.UpdateCommand(params);
        try {
            await this.db.send(updateCommand);
            console.log(`db:update(${this.table}) => id=${item.id} - OK`);
            return item;
        }
        catch (error) {
            console.error(`db:update(${this.table}) => id=${item.id} - Erro DynamoDB: ${error.message}`);
            throw error;
        }
    }
    /**
     * Create data in the table.
     * @param item Data to be created in the table.
     * @returns Created data.
     */
    async insert(item) {
        if (!item.id) {
            item.id = (0, uuid_1.v4)();
        }
        const params = {
            TableName: this.table,
            Item: this.mapper.toItem(item),
        };
        const putCommand = new lib_dynamodb_1.PutCommand(params);
        try {
            await this.db.send(putCommand);
            console.log(`db:insert(${this.table}) => id=${item.id} - OK`);
            return item;
        }
        catch (err) {
            console.error(`db:insert(${this.table}) => id=${item.id} - Erro DynamoDB: ${err.message}`);
            throw err;
        }
    }
}
exports.CrudRepository = CrudRepository;
//# sourceMappingURL=crud-repository.js.map