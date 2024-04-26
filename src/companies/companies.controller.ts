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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtRoleGuard } from 'src/auth/jwt.role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('companies')
@ApiTags('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtRoleGuard)
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: 201,
    description: 'It will return the created company in the response',
  })
  @ApiResponse({
    status: 401,
    description:
      'You are required to be logged with Admin or Supervisor credentials in to use this service',
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({
    status: 200,
    description: 'It will return a list of companies',
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
  ): Promise<Pagination<Company>> {
    limit = limit > 100 ? 100 : limit;
    return this.companiesService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get one company by id' })
  @ApiResponse({
    status: 200,
    description: 'It will return the existing company',
  })
  @ApiResponse({
    status: 401,
    description: 'You are required to be logged in to use this service',
  })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtRoleGuard)
  @ApiOperation({ summary: 'Edit an existing company' })
  @ApiResponse({
    status: 200,
    description: 'It will return the updated company in the response',
  })
  @ApiResponse({
    status: 401,
    description:
      'You are required to be logged with Admin or Supervisor credentials in to use this service',
  })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtRoleGuard)
  @ApiOperation({ summary: 'Delete an existing company' })
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
    return this.companiesService.remove(+id);
  }
}
