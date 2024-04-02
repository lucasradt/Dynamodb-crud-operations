import { personRepository } from "./person-repository";
import { Person } from "./person-model";

const person = new Person();
person.id = "abcdd";
person.name = "name-236";
person.birthday = '1990-20-06';
// person.active = true;

// personRepository.insert(person)
//   .then(createdPerson => console.log(createdPerson))
//   // .then(async () => personRepository.findByQuery())
//   .then(allPersons => console.log(allPersons))
//   .then(async () => personRepository.findOneById(person.id))
//   .then(foundPerson => console.log(foundPerson))
//   .then(async () => personRepository.delete(person))
//   .then(async () => personRepository.findOneById(person.id)) // Deve retornar null.
//   .then(deletedPerson => console.log(deletedPerson)) // Deve printar null.
//   .catch(e => console.error(e));

// personRepository.findOneById({ cd_id: person.id });
personRepository.insert(person);
// personRepository.findOneById(person.id).then((item) => console.log(item))
// personRepository.update(person).then((item) => console.log(item))
