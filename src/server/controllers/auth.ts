import { TRPCError } from '@trpc/server';
import UsersRepository from '../../internal/repos/users';
import StorageAdapterFactory from '../../internal/storage/factory';
import { UserRoleEnum, UserStatus } from '../../internal/storage/models/users';
import { Context } from '../trpc';
import bcrypt from 'bcrypt';

export const signup = async ({ input }: { ctx: Context; input: { email: string; password: string; fullName: string } }) => {
  const { password } = input;
  const saltRounds = 10;

  const storageAdp = StorageAdapterFactory.getStorage();
  const usersRepo = new UsersRepository(storageAdp);

  const userExists = await usersRepo.checkUserExistsByEmail(input.email);
  if (userExists) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Account already exists. Please login.',
    });
  }

  const decodePass = Buffer.from(password, 'base64').toString();
  const encPass = await bcrypt.hash(decodePass, saltRounds);

  const res = await usersRepo.createUser({
    ...input,
    password: encPass,
    role: UserRoleEnum.ADMIN,
    status: UserStatus.ACTIVE,
  });

  console.log({ res });

  return res;
};

export const login = async ({ input }: { ctx: Context; input: { email: string; password: string } }) => {
  const { email, password } = input;

  const storageAdp = StorageAdapterFactory.getStorage();
  const usersRepo = new UsersRepository(storageAdp);

  const user = await usersRepo.getUserByEmail(email);

  const decodePass = Buffer.from(password, 'base64').toString();
  const isValidPass = await bcrypt.compare(decodePass, user?.password || '');

  if (!isValidPass) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Username or password is incorrect',
    });
  }

  const lastLogin = new Date();
  await usersRepo.updateUser(user.id, { lastLogin });
  delete user.password;
  console.log('login controller', { user });
  return user;
};
