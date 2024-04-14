import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connection } from 'src/common/constants/connection';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Company } from './entities/company.entity';
import { Client } from 'src/clients/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Company])],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class CompaniesModule {}
