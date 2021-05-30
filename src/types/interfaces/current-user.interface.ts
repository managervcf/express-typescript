import { UserRoles } from '../enums/user-roles.enum';

export interface ICurrentUser {
  id: number;
  email: string;
  role: UserRoles;
}
