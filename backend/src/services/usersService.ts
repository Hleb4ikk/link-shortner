import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { db } from 'database/db';
import { usersTable } from 'database/schemas/usersTable';
import { eq } from 'drizzle-orm';
import {
  BadRequestException,
  InternalServerErrorException,
} from 'types/exceptions/HttpExceptions';
import { UserDto, UserDtoGroups } from 'types/UserDto';
import { encrypt } from 'utils/hash';

const getUserById = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
    return result[0];
  } catch {
    throw new InternalServerErrorException('Failed to fetch user');
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return result[0];
  } catch {
    throw new InternalServerErrorException('Failed to fetch user');
  }
};

const createUser = async (user: unknown): Promise<string | undefined> => {
  const createUserDto = plainToInstance(UserDto, user);
  const errors = await validate(createUserDto, {
    groups: [UserDtoGroups.create],
  });

  if (errors.length > 0) {
    throw new BadRequestException('Invalid data');
  }

  try {
    const result = await db
      .insert(usersTable)
      .values({
        ...createUserDto,
        hashedPassword: await encrypt(createUserDto.password),
      })
      .returning({ id: usersTable.id });

    return result[0].id;
  } catch {
    throw new InternalServerErrorException('Failed to create user');
  }
};

const updateUser = async (id: string, user: unknown): Promise<void> => {
  const updateUserDto = plainToInstance(UserDto, user);
  const errors = await validate(updateUserDto, {
    groups: [UserDtoGroups.update],
  });

  if (errors.length > 0) {
    throw new BadRequestException('Invalid data');
  }

  try {
    await db
      .update(usersTable)
      .set(
        !updateUserDto.password
          ? { ...updateUserDto }
          : {
              ...updateUserDto,
              updatedAt: new Date(Date.now()),
              hashedPassword: await encrypt(updateUserDto.password),
            },
      )
      .where(eq(usersTable.id, id));
  } catch {
    throw new InternalServerErrorException('Failed to update user');
  }
};

export { getUserById, getUserByEmail, createUser, updateUser };
