import { Request, Response } from 'express';
import { authService, AuthService } from '../services';
import { ICurrentUser, IToken } from '../types';

class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Registers a user.
   */
  public registerUser = async (
    req: Request,
    res: Response
  ): Promise<Response<IToken>> => {
    const token = await this.authService.registerUser(req.body);
    return res.send(token);
  };

  /**
   * Logs in a user.
   */
  public loginUser = async (
    req: Request,
    res: Response
  ): Promise<Response<IToken>> => {
    const token = await this.authService.loginUser(req.body);
    return res.send(token);
  };

  /**
   * Checks if there is a currently logged in user.
   */
  public getCurrentUser = async (
    req: Request,
    res: Response
  ): Promise<Response<ICurrentUser | null>> => {
    const currentUser = await this.authService.getCurrentUser(
      req.headers.authorization! as string
    );

    return res.send(currentUser);
  };
}

export const authController = new AuthController(authService);
