import { AttributeMap } from "aws-sdk/clients/dynamodb";
export declare class Mapper<T extends {
    id: string;
}> {
    fromItem(item: AttributeMap, entityConstructor: new () => T): T;
    toItem(entity: T): AttributeMap;
}
