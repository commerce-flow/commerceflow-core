import { TRPCError } from '@trpc/server';
import UsersRepository from '../../internal/repos/users';
import StorageAdapterFactory from '../../internal/storage/factory';
import { UserRoleEnum, UserStatus } from '../../internal/storage/models/users';
import { Context } from '../trpc';
import bcrypt from 'bcrypt';
import envs from '../../../config/envs';
import axios from 'axios';

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

  return user;
};

export const getClientEnvs = async () => {
  const wbFlow = envs.webflow();

  return {
    webflow: {
      clientId: wbFlow.clientId,
    },
  };
};

export const requestWebflowOauthAccessToken = async ({ input }: { ctx: Context; input: { authCode: string } }) => {
  const wbFlow = envs.webflow();
  const resp = await axios.post<{ token_type: string; access_token: string }>(`${wbFlow.apiUrl}/oauth/access_token`, {
    client_id: wbFlow.clientId,
    client_secret: wbFlow.secret,
    code: input.authCode,
    grant_type: 'authorization_code',
  });

  return resp.data;
};
