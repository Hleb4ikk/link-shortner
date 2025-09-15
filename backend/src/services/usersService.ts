import { db } from 'database/db';
import { usersTable } from 'database/schemas/usersTable';
import { eq } from 'drizzle-orm';
import { CreateUserDto, UpdateUserDto } from 'types/users';
import { encrypt } from 'utils/hash';

const getUserById = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (user: CreateUserDto): Promise<string | undefined> => {
  try {
    const result = await db
      .insert(usersTable)
      .values({ ...user, hashedPassword: await encrypt(user.password) })
      .returning();

    return result[0].id;
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
  }
};

export { getUserById, createUser, updateUser };
