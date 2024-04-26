import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtRoleGuard } from 'src/auth/jwt.role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('clients')
@ApiTags('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtRoleGuard)
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'It will return the created client in the response',
  })
  @ApiResponse({
    status: 401,
    description:
      'You are required to be logged with Admin or Supervisor credentials in to use this service',
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({
    status: 200,
    description: 'It will return a list of clients',
  })
  @ApiResponse({
    status: 401,
    description: 'You are required to be logged in to use this service',
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Pagination<Client>> {
    limit = limit > 100 ? 100 : limit;
    return this.clientsService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get one client by id' })
  @ApiResponse({
    status: 200,
    description: 'It will return the existing client',
  })
  @ApiResponse({
    status: 401,
    description: 'You are required to be logged in to use this service',
  })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtRoleGuard)
  @ApiOperation({ summary: 'Edit an existing role' })
  @ApiResponse({
    status: 200,
    description: 'It will return the updated role in the response',
  })
  @ApiResponse({
    status: 401,
    description:
      'You are required to be logged with Admin or Supervisor credentials in to use this service',
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtRoleGuard)
  @ApiOperation({ summary: 'Delete an existing client' })
  @ApiResponse({
    status: 200,
    description: 'It will return if the operation was completed successfully',
  })
  @ApiResponse({
    status: 401,
    description:
      'You are required to be logged with Admin or Supervisor credentials in to use this service',
  })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
