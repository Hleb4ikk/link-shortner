import { LoginDto, RegisterDto } from 'types/users';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
  BadRequestException,
  ConflictException,
} from 'types/exceptions/HttpExceptions';
import { createUser, getUserByEmail } from './usersService';
import jwt from 'jsonwebtoken';
import { appConfig } from 'configuration/appConfig';
import { jwtEncryptionAlgorithm } from 'constants/jwt-encryption-algorithm';

const register = async (data: unknown) => {
  // data validation
  const registerDto = plainToInstance(RegisterDto, data);

  const errors = await validate(registerDto);

  if (errors.length > 0) {
    throw new BadRequestException('Invalid data');
  }

  //check if user already exists
  const user = await getUserByEmail(registerDto.email);

  if (user) {
    throw new ConflictException('User already exists');
  }

  // create user and token
  const userId = await createUser(registerDto);

  const token = jwt.sign({ sub: userId }, appConfig.jwtToken.secret, {
    algorithm: jwtEncryptionAlgorithm,
    expiresIn: appConfig.jwtToken.expiresIn,
    issuer: appConfig.serverUrl,
    audience: appConfig.clientUrl,
  });
  return token;
};

const login = async (data: unknown) => {
  const loginDto = plainToInstance(LoginDto, data);
  const errors = await validate(loginDto);

  if (errors.length > 0) {
    throw new BadRequestException('Invalid data');
  }
};

// const logout = async (user: any) => {};

export { register, login };
