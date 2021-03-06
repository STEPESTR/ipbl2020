import { Inject, Injectable } from '@nestjs/common';
import { Person } from './Person';
import { Repository } from 'typeorm';
import { PersonQuery } from './PersonQuery';
import { PersonQueryResult } from './PersonQueryResult';

@Injectable()
export class PersonRepository {
  constructor(
    @Inject('PERSON_REPOSITORY') private personRepository: Repository<Person>,
  ) {}

  async index(queryParams: PersonQuery): Promise<PersonQueryResult> {
    const limit = queryParams.limit ? Number(queryParams.limit) : 10;
    const page = queryParams.page ? Number(queryParams.page) : 1;
    queryParams.limit ? Number(queryParams.limit) : 10;
    const query = this.personRepository.createQueryBuilder('person');
    query.take(limit);
    query.skip((page - 1) * limit);
    queryParams.orderBy &&
      query.orderBy(`person.${queryParams.orderBy}`, queryParams.order);
    const people = await query.getMany();
    const count = await query.getCount();
    const pagesAmmount = Math.ceil(count / queryParams.limit);
    const result: PersonQueryResult = {
      page,
      limit,
      count,
      pagesAmmount,
      people,
    };
    return result;
  }

  async show(id: number): Promise<Person> {
    return await this.personRepository.findOne({ idPerson: id });
  }

  async store(data: Person): Promise<Person> {
    const person: Person = this.personRepository.create(data);
    return await this.personRepository.save(person);
  }

  async update(id: number, data: Person): Promise<Person> {
    await this.personRepository.update({ idPerson: id }, data);
    return this.show(id);
  }

  async delete(id: number) {
    const person = await this.personRepository.find({ idPerson: id });
    await this.personRepository.remove(person);
  }

  async getAll(): Promise<Person[]> {
    return await this.personRepository.find();
  }
}
