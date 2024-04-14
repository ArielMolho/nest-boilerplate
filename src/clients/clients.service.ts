import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = new Client();
    client.firstName = createClientDto.firstName;
    client.lastName = createClientDto.lastName;
    client.email = createClientDto.email;
    client.phone = createClientDto.phone;
    client.address = createClientDto.address;
    client.city = createClientDto.city;
    client.state = createClientDto.state;
    client.zip = createClientDto.zip;
    client.country = createClientDto.country;
    client.company = await this.companyRepository.findOneBy({
      id: createClientDto.companyId,
    });

    return await this.clientRepository.save(createClientDto);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    return await this.clientRepository.findOneBy({ id });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return await this.clientRepository.update(id, updateClientDto);
  }

  async remove(id: number) {
    return await this.clientRepository.delete(id);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Client>> {
    const queryBuilder = this.clientRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.firstName', 'DESC');
    return paginate<Client>(queryBuilder, options);
  }
}
