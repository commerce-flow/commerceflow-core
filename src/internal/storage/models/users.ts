import { BaseModel } from './base';

export enum UserRoleEnum {
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
}

export interface UsersModel extends BaseModel {
  fullName: string;
  email: string;
  password?: string;
  createdTime: Date;
  updatedTime?: Date | null;
  deletedTime?: Date | null;
  lastLogin?: Date | null;
  role?: UserRoleEnum;
  status?: UserStatus;
}
