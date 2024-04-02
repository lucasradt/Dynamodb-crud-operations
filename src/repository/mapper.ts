import { AttributeMap } from "aws-sdk/clients/dynamodb";
import { getColumn } from "./decorators/column-decorator";

// export class Mapper<T extends { id: string }> {

//   public fromItem(item: AttributeMap, entity: new() => T): T {
//     const result = new entity();
//     for (const symbol of Reflect.getMetadataKeys(entity)) {
//       if ((symbol as symbol).toString() === `Symbol(column)`) {
//         const metadata = Reflect.getMetadata(symbol, entity);
//         Object.keys(metadata)
//           .forEach((key) => {
//             const column = metadata[key];
//             const name = column.name;
//             const dsrl = column.deserializer;
//             const value = item[name];
//             result[key] = dsrl ? dsrl(value) : value;
//           });
//         return result;
//       }
//     }
//   }

//   public toItem(entity: T): AttributeMap {
//     const result = { };
//     // tslint:disable-next-line: forin
//     for (const property in entity) {
//       const column = getColumn(entity, property);
//       const value = entity[property];
//       if (typeof column === "string") { // when item doesn't have decorators
//         result[column] = value;
//       } else {
//         const name = column.name;
//         const srlz = column.serializer;
//         result[name] = srlz ? srlz(value) : value;
//       }
//     }
//     return result;
//   }

// }

export class Mapper<T extends { id: string }> {
  public fromItem(item: AttributeMap, entityConstructor: new () => T): T {
    const result = new entityConstructor();

    for (const symbol of Reflect.getMetadataKeys(entityConstructor)) {
      if (symbol?.toString() === `Symbol(column)`) {
        const metadata = Reflect.getMetadata(symbol, entityConstructor);

        Object.entries(metadata).forEach(([key, column]) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { name, deserializer } = column as any;
          const value = item[name];
          result[key] = deserializer ? deserializer(value) : value;
        });

        return result;
      }
    }

    return result;
  }

  public toItem(entity: T): AttributeMap {
    const result: AttributeMap = {};

    for (const property in entity) {
      const column = getColumn(entity, property);
      const value = entity[property];

      if (typeof column === "string") {
        // quando o item não tem decoradores
        result[column] = value;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { name, serializer } = column as any;
        result[name] = serializer ? serializer(value) : value;
      }
    }

    return result;
  }
}
