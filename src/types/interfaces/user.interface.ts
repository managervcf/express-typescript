import { UserRoles } from '../enums/user-roles.enum';

export interface ILoginUserDto {
  email: string;
  password: string;
}

export interface ICreateUserDto extends ILoginUserDto {
  adminSecret?: string;
}

export interface ICurrentUser {
  id: number;
  email: string;
  role: UserRoles;
}
