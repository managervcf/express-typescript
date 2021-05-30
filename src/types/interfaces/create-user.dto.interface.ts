import { LoginUserDto } from './login-user.dto.interface';

export interface CreateUserDto extends LoginUserDto {
  adminSecret?: string;
}
