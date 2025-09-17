import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';

class RegisterDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsStrongPassword()
  @IsOptional()
  password: string;
}

export { RegisterDto, LoginDto, CreateUserDto, UpdateUserDto };
