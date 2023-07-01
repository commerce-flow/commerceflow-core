import { BaseModel } from './base';

enum UserRoleEnum {
  ADMIN = 'admin',
}

enum UserStatus {
  ACTIVE = 'active',
}

export interface UsersModel extends BaseModel {
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  lastLogin: Date | null;
  role: UserRoleEnum;
  status: UserStatus;
}
