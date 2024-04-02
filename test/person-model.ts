import { Column } from "../src/repository/decorators/column-decorator";
import { Key } from "../src/repository/decorators/key-decorator";
import { Table } from "../src/repository/decorators/table-decorator";


@Table('person')
export class Person {
  @Key()
  @Column('cd_id')
  id: string;

  @Column('ds_name')
  name: string;

  @Column('date_birth')
  birthday: string;
}