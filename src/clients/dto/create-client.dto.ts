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
  readonly firstName;

  @IsString()
  @IsNotEmpty()
  readonly lastName;

  @IsEmail()
  @IsNotEmpty()
  readonly email;

  @IsNumber()
  @IsOptional()
  readonly phone;

  @IsString()
  @IsOptional()
  readonly address;

  @IsString()
  @IsNotEmpty()
  readonly city;

  @IsString()
  @IsOptional()
  readonly state;

  @IsString()
  @IsOptional()
  readonly zip;

  @IsString()
  @IsNotEmpty()
  readonly country;

  @IsNumber()
  @IsNotEmpty()
  readonly companyId;
}
