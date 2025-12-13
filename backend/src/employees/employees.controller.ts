import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private service: EmployeesService) {}

  @Get()
  findAll(
    @Query('search') search: string,
    @Query('minSalary') minSalary: string,
    @Query('maxSalary') maxSalary: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.service.findAll(
      search,
      Number(minSalary),
      Number(maxSalary),
      Number(page),
      Number(limit),
    );
  }

  @Post()
  create(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!body.name) throw new BadRequestException('Name required');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!body.role) throw new BadRequestException('Role required');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!body.salary || body.salary <= 0)
      throw new BadRequestException('Invalid salary');

    return this.service.create(body);
  }
}
