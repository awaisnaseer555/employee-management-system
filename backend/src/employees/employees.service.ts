import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
  constructor(@InjectRepository(Employee) private repo: Repository<Employee>) {}

  async findAll(
    search: string,
    min: number,
    max: number,
    page: number,
    limit: number,
  ) {
    const where: any = {};

    if (search) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.name = Like(`%${search}%`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (min && max) where.salary = Between(min, max);

    const [data, total] = await this.repo.findAndCount({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where,
      take: limit,
      skip: (page - 1) * limit,
    });

    return { data, total, page, limit };
  }

  create(dto: any) {
    const emp = this.repo.create(dto);
    return this.repo.save(emp);
  }
}
