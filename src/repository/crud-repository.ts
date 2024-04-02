import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  PutCommand,
  UpdateCommand,
  UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { getKey } from "./decorators/key-decorator";
import { getTable } from "./decorators/table-decorator";
import { configure } from "./infrastructure/utils/aws-dynamodb-config";
import { getTableSuffix } from "./infrastructure/utils/aws-table";
import { Mapper } from "./mapper";
// import { marshall } from "@aws-sdk/util-dynamodb";

export abstract class CrudRepository<T extends { id: string }> {
  protected mapper: Mapper<T>;
  protected key: string;
  protected table: string;
  protected db: DynamoDBDocumentClient;

  constructor(private entity: new () => T) {
    const sample = new entity();
    this.mapper = new Mapper<T>();
    this.key = getKey(sample);
    this.table = `${getTable(sample)}${getTableSuffix()}`;
    // this.db = new AWS.DynamoDB.DocumentClient(configure());
    this.db = DynamoDBDocumentClient.from(new DynamoDBClient(configure()));
  }

  /**
   * Find data by id.
   * @param id Id.
   * @param consistentRead Defines whether the reading should be consistent.
   * @returns Data from table.
   */
  public async findOneById(id: string, consistentRead = false): Promise<T> {
    const keyValue = { [this.key]: id };

    const params = {
      Key: keyValue,
      TableName: this.table,
      ConsistentRead: consistentRead,
    };

    const getCommand = new GetCommand(params);
    try {
      const response: GetCommandOutput = await this.db.send(getCommand);
      if (!response.Item) {
        console.log(`db:get(${this.table}) => id=${id} - Item não encontrado`);
        return;
      }

      return this.mapper.fromItem(response.Item, this.entity);
    } catch (error) {
      console.error(
        `db:get(${this.table}) => id=${id} - Erro ao buscar na DynamoDB: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Update data in the table.
   * @param item Data to be update in the table.
   * @returns Updated data.
   */
  public async update(item: T): Promise<T> {
    if (!item || !item.id) {
      console.error(`db:update(${this.table}) => Item ou id nulo`);
      return;
    }
    const keyValue = { [this.key]: item.id };

    const params: UpdateCommandInput = {
      Key: keyValue,
      TableName: this.table,
      Item: this.mapper.toItem(item),
    };
    const updateCommand = new UpdateCommand(params);

    try {
      await this.db.send(updateCommand);

      console.log(`db:update(${this.table}) => id=${item.id} - OK`);
      return item;
    } catch (error) {
      console.error(
        `db:update(${this.table}) => id=${item.id} - Erro DynamoDB: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * Create data in the table.
   * @param item Data to be created in the table.
   * @returns Created data.
   */
  public async insert(item: T): Promise<T> {
    if (!item.id) {
      item.id = uuidv4();
    }

    const params = {
      TableName: this.table,
      Item: this.mapper.toItem(item),
    };
    const putCommand = new PutCommand(params);

    try {
      await this.db.send(putCommand);
      console.log(`db:insert(${this.table}) => id=${item.id} - OK`);
      return item;
    } catch (err) {
      console.error(
        `db:insert(${this.table}) => id=${item.id} - Erro DynamoDB: ${err.message}`
      );
      throw err;
    }
  }

  // /**
  //  * Delete data from table.
  //  * @param item Data to be entered.
  //  * @returns Data entered.
  //  */
  // public async delete(item: T): Promise<void> {
  //   if (!item || !item.id) {
  //     console.error(`db:delete(${this.table}) => item ou id nulo`);
  //     return;
  //   }

  //   const Key = { [this.key]: item.id };

  //   const params = {
  //     Key,
  //     TableName: this.table,
  //   };
  //   const deleteCommand = new DeleteCommand(params);

  //   try {
  //     await this.db.send(deleteCommand);
  //     console.log(`db:delete(${this.table}) => id=${item.id} - OK`);
  //   } catch (err) {
  //     console.error(
  //       `db:delete(${this.table}) => id=${item.id} - Erro DynamoDB: ${err.message}`
  //     );
  //     throw err;
  //   }
  // }

  // /**
  //  * Find data from table by queryImput.
  //  * @param params QueryImput.
  //  * @returns List of data from table.
  //  */
  // public async findByQuery(params: QueryCommandInput): Promise<T[]> {
  //   try {
  //     const items: Array<Record<string, AttributeValue>> = [];
  //     let readNextPage: boolean;

  //     const queryCommand = new QueryCommand(params);

  //     do {
  //       const data = await this.db.send(queryCommand);
  //       items.push(...data.Items);
  //       readNextPage = data.LastEvaluatedKey ? true : false;
  //       params.ExclusiveStartKey = data.LastEvaluatedKey;
  //     } while (readNextPage);

  //     return items.length > 0
  //       ? items.map((Item) => this.mapper.fromItem(Item, this.entity))
  //       : [];
  //   } catch (err) {
  //     console.error(
  //       `db:findByQuery(${this.table}) => Erro DynamoDB: ${err.message}`
  //     );
  //     throw err;
  //   }
  // }
}
