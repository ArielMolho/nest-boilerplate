import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyRepository.save(createCompanyDto);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    return await this.companyRepository.findOneBy({ id });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyRepository.update(id, updateCompanyDto);
  }

  async remove(id: number) {
    return await this.companyRepository.delete(id);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Company>> {
    const queryBuilder = this.companyRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC');
    return paginate<Company>(queryBuilder, options);
  }
}
