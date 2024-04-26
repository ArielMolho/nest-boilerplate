import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNumber()
  @IsOptional()
  readonly phone: number;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsOptional()
  readonly state: string;

  @IsString()
  @IsOptional()
  readonly zip: string;

  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @IsNumber()
  @IsNotEmpty()
  readonly companyId: number;
}
