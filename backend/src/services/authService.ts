import { UserDto, UserDtoGroups } from 'types/UserDto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from 'types/exceptions/HttpExceptions';
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from './usersService';
import jwt from 'jsonwebtoken';
import { appConfig } from 'configuration/appConfig';
import { jwtEncryptionAlgorithm } from 'constants/jwt-encryption-algorithm';
import { compare } from 'utils/hash';
import { ChangePasswordDto } from 'types/ChangePasswordDto';

const register = async (data: unknown) => {
  // data validation
  const registerDto = plainToInstance(UserDto, data);

  const errors = await validate(registerDto, {
    groups: [UserDtoGroups.register],
  });

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
  const loginDto = plainToInstance(UserDto, data);
  const errors = await validate(loginDto, { groups: [UserDtoGroups.login] });

  if (errors.length > 0) {
    throw new BadRequestException('Invalid data');
  }

  const user = await getUserByEmail(loginDto.email);

  if (!user) {
    throw new NotFoundException('User does not exist');
  }

  const isPasswordCorrect = await compare(
    loginDto.password,
    user.hashedPassword,
  );

  if (!isPasswordCorrect) {
    throw new BadRequestException('Incorrect password');
  }

  return jwt.sign({ sub: user.id }, appConfig.jwtToken.secret, {
    algorithm: jwtEncryptionAlgorithm,
    expiresIn: appConfig.jwtToken.expiresIn,
    issuer: appConfig.serverUrl,
    audience: appConfig.clientUrl,
  });
};

const changePassword = async (userId: string, data: unknown) => {
  const changePasswordDto = plainToInstance(ChangePasswordDto, data);
  const errors = await validate(changePasswordDto);

  if (errors.length > 0) {
    throw new BadRequestException('Invalid data');
  }
  const user = await getUserById(userId);
  const isPasswordCorrect = await compare(
    changePasswordDto.oldPassword,
    user.hashedPassword,
  );

  if (!isPasswordCorrect) {
    throw new BadRequestException('Incorrect old password');
  }
  await updateUser(userId, {
    password: changePasswordDto.newPassword,
  });
};

export { register, login, changePassword };
