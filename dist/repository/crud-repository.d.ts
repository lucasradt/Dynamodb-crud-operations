import * as AWSTypes from "aws-sdk/clients/dynamodb";
import { Mapper } from "./mapper";
export declare abstract class CrudRepository<T extends {
    id: string;
}> {
    private entity;
    protected mapper: Mapper<T>;
    protected key: string;
    protected table: string;
    protected db: AWSTypes.DocumentClient;
    constructor(entity: new () => T);
    /**
     * Find data by id.
     * @param id Id.
     * @param consistentRead Defines whether the reading should be consistent.
     * @returns Data from table.
     */
    findOneById(id: string, consistentRead?: boolean): Promise<T>;
    /**
     * Update data in the table.
     * @param item Data to be update in the table.
     * @returns Updated data.
     */
    update(item: T): Promise<T>;
    /**
     * Create data in the table.
     * @param item Data to be created in the table.
     * @returns Created data.
     */
    insert(item: T): Promise<T>;
    /**
     * Delete data from table.
     * @param item Data to be entered.
     * @returns Data entered.
     */
    delete(item: T): Promise<void>;
    /**
     * Find data from table by queryImput.
     * @param params QueryImput.
     * @returns List of data from table.
     */
    findByQuery(params: AWSTypes.QueryInput): Promise<T[]>;
}
