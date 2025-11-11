import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';

enum UserDtoGroups {
  register = 'register',
  login = 'login',
  create = 'create',
  update = 'update',
}

class UserDto {
  @IsEmail(
    {},
    {
      groups: [
        UserDtoGroups.register,
        UserDtoGroups.login,
        UserDtoGroups.create,
      ],
    },
  )
  @IsString({ groups: [UserDtoGroups.create] })
  @IsOptional({ groups: [UserDtoGroups.update] })
  email: string;

  @IsStrongPassword({}, { groups: [UserDtoGroups.register] })
  @IsString({ groups: [UserDtoGroups.login, UserDtoGroups.create] })
  @IsOptional({ groups: [UserDtoGroups.update] })
  password: string;
}

export { UserDto, UserDtoGroups };
