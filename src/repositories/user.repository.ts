import { getRepository } from 'typeorm';
import { config } from '../config';
import { User } from '../entities';
import { ErrorMessage, ICreateUserDto, UserRoles } from '../types';

export class UserRepository {
  /**
   * Retrieves all users.
   */
  public async getUsers(): Promise<User[]> {
    const users = await getRepository(User).find();
    console.dir('Found all users ------>', { colors: true });
    console.dir(users, { depth: Infinity, colors: true });

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
      console.dir('Created user ------>', { colors: true });
      console.dir(savedUser, { depth: Infinity, colors: true });
    } catch (error) {
      console.log(error);
      throw new Error(ErrorMessage.UserNotCreated);
    }

    return savedUser;
  }

  /**
   * Retrieves a user by id.
   */
  public async getUser(id: number): Promise<User | null> {
    const user = await getRepository(User).findOne({ id });
    console.dir(`Found user by id '${id}' ------>`, { colors: true });
    console.dir(user, { depth: Infinity, colors: true });

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
      console.dir(`Found user by email '${email}' ------>`, { colors: true });
      console.dir(user, { depth: Infinity, colors: true });
    }

    return user ?? null;
  }
}

export const userRepository = new UserRepository();
