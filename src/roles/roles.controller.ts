import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtRoleGuard } from 'src/auth/jwt.role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtRoleGuard)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'It will return the created role in the response',
  })
  @ApiResponse({
    status: 401,
    description:
      'You are required to be logged with Admin or Supervisor credentials in to use this service',
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'It will return a list of roles',
  })
  @ApiResponse({
    status: 401,
    description: 'You are required to be logged in to use this service',
  })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get one role by id' })
  @ApiResponse({
    status: 200,
    description: 'It will return the existing role',
  })
  @ApiResponse({
    status: 401,
    description: 'You are required to be logged in to use this service',
  })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
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
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtRoleGuard)
  @ApiOperation({ summary: 'Delete an existing role' })
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
    return this.rolesService.remove(+id);
  }
}
