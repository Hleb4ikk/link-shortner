import { db } from 'database/db';
import { usersTable } from 'database/schemas/usersTable';
import { eq } from 'drizzle-orm';
import { InternalServerErrorException } from 'types/exceptions/HttpExceptions';
import { CreateUserDto, UpdateUserDto } from 'types/users';
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

const createUser = async (user: CreateUserDto): Promise<string | undefined> => {
  try {
    const result = await db
      .insert(usersTable)
      .values({ ...user, hashedPassword: await encrypt(user.password) })
      .returning();

    return result[0].id;
  } catch {
    throw new InternalServerErrorException('Failed to create user');
  }
};

const updateUser = async (
  id: string,
  user: UpdateUserDto,
): Promise<string | undefined> => {
  try {
    const result = await db
      .update(usersTable)
      .set(
        !user.password
          ? { ...user }
          : { ...user, hashedPassword: await encrypt(user.password) },
      )
      .where(eq(usersTable.id, id))
      .returning();
    return result[0].id;
  } catch {
    throw new InternalServerErrorException('Failed to update user');
  }
};

export { getUserById, createUser, updateUser };
