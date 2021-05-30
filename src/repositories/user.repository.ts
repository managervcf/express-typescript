import { getRepository } from 'typeorm';
import { config } from '../config';
import { User } from '../entities';
import { ICreateUserDto, UserRoles } from '../types';

export class UserRepository {
  /**
   * Retrieves all users.
   */
  public async getUsers(): Promise<User[]> {
    const users = await getRepository(User).find();

    return users;
  }

  /**
   * Creates a new user.
   */
  public async createUser({
    email,
    password,
    adminSecret,
  }: ICreateUserDto): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    user.role =
      adminSecret === config.adminSecret ? UserRoles.Admin : UserRoles.User;
    user.hashPassword();

    let savedUser = null;
    try {
      savedUser = await getRepository(User).save(user);
    } catch (error) {
      console.log(error);
      throw new Error('User cannot be created');
    }

    return savedUser;
  }

  /**
   * Retrieves a user by id.
   */
  public async getUser(id: number): Promise<User | null> {
    const user = await getRepository(User).findOne({ id });

    return user ?? null;
  }

  /**
   * Retrieves a user by email. Password field is excluded by default.
   */
  public async getUserByEmail(
    email: string,
    includePassword?: boolean
  ): Promise<User | null> {
    let user;

    if (includePassword) {
      user = await getRepository(User)
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .addSelect('user.password')
        .getOne();
    } else {
      user = await getRepository(User).findOne({ email });
    }

    return user ?? null;
  }
}

export const userRepository = new UserRepository();
