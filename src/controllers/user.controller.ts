import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { userRepository, UserRepository } from '../repositories';
import { User } from '../models';
import { CreateUserDto } from '../types/interfaces';

@Route('users')
@Tags('User')
class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get('/')
  public async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  @Post('/')
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  @Get('/:id')
  public async getUser(@Path() id: string): Promise<User | null> {
    return this.userRepository.getUser(Number(id));
  }
}

export const userController = new UserController(userRepository);
