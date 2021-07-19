import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { userRepository, UserRepository } from '../repositories';
import { User } from '../entities';
import { ICreateUserDto } from '../types';

@Route('/api/users')
@Tags('User')
export class UserService {
  constructor(private userRepository: UserRepository) {}

  @Get('/')
  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  @Post('/')
  async createUser(@Body() createUserDto: ICreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  @Get('/:id')
  async getUser(@Path() id: string): Promise<User | null> {
    return this.userRepository.getUser(Number(id));
  }
}

export const userService = new UserService(userRepository);
