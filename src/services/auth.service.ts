import { Get, Route, Tags, Post, Body, Header } from 'tsoa';
import { getRepository } from 'typeorm';
import { User } from '../entities';
import { createToken, verifyToken } from '../middlewares';
import { UserRepository, userRepository } from '../repositories';
import { ICreateUserDto, ICurrentUser, IToken, ILoginUserDto } from '../types';

@Route('/api/auth')
@Tags('Auth')
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  @Post('/register')
  public async registerUser(
    @Body() createUserDto: ICreateUserDto
  ): Promise<IToken> {
    const { id, email, role } = await this.userRepository.createUser(
      createUserDto
    );

    const token = createToken({ id, email, role });

    return token;
  }

  @Post('/login')
  public async loginUser(
    @Body() { email, password }: ILoginUserDto
  ): Promise<IToken | null> {
    const foundUser = await this.userRepository.getUserByEmail(email, true);

    if (!foundUser) {
      return null;
    }

    if (!foundUser.checkIfUnencryptedPasswordIsValid(password)) {
      return null;
    }

    const token = createToken({
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    });

    return token;
  }

  @Get('/currentuser')
  public async getCurrentUser(
    @Header() token: string
  ): Promise<ICurrentUser | null> {
    let currentUser: ICurrentUser | null = null;

    try {
      currentUser = verifyToken(token);

      if (currentUser) {
        const foundUser = await getRepository(User).findOne({
          id: currentUser.id,
        });

        if (foundUser) {
          const { id, email, role } = foundUser;
          currentUser = { id, email, role };
        } else {
          return null;
        }
      }
    } catch (error) {
      return null;
    }

    return currentUser;
  }
}

export const authService = new AuthService(userRepository);
