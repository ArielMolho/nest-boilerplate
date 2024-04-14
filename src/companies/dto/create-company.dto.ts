import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  readonly name;

  @IsUrl()
  @IsNotEmpty()
  readonly website;

  @IsEmail()
  @IsNotEmpty()
  readonly email;

  @IsNumber()
  @IsOptional()
  readonly phone;

  @IsString()
  @IsNotEmpty()
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
}
