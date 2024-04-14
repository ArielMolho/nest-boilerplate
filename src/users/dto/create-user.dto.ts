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
  readonly firstName;

  @IsString()
  @IsNotEmpty()
  readonly lastName;

  @IsEmail()
  @IsNotEmpty()
  readonly email;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  readonly roleId;
}
