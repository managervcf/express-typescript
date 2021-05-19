import { getRepository, Repository } from 'typeorm';
import { User } from '../models';
import { CreateUserDto } from '../types/interfaces';

export class UserRepository {
  private get userRepository(): Repository<User> {
    return getRepository(User);
  }

  public async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    return this.userRepository.save({
      ...user,
      ...createUserDto,
    });
  }

  public async getUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      return null;
    }

    return user;
  }
}

export const userRepository = new UserRepository();
