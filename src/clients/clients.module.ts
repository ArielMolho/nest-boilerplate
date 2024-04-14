import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connection } from 'src/common/constants/connection';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './entities/client.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Company])],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class ClientsModule {}
