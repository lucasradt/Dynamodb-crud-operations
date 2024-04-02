import { Person } from './person-model';
import { CrudRepository } from '../src/repository/crud-repository';
export declare class PersonRepository extends CrudRepository<Person> {
    constructor();
}
export declare const personRepository: PersonRepository;
