import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsAlphanumeric,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  readonly roleId: number;
}
