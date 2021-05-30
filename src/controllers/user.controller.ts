import { Request, Response } from 'express';
import { User } from '../entities';
import { UserService, userService } from '../services';

class UserController {
  constructor(private userService: UserService) {}

  /**
   * Retrieves all users.
   */
  public getUsers = async (
    _req: Request,
    res: Response
  ): Promise<Response<User[]>> => {
    const users = await this.userService.getUsers();
    return res.send(users);
  };

  /**
   * Retrieves a specific user.
   */
  public getUser = async (
    req: Request,
    res: Response
  ): Promise<Response<User | null>> => {
    const user = await this.userService.getUser(req.params.id);

    if (!user) {
      return res.status(404).send({ message: 'No user found' });
    }

    return res.send(user);
  };
}

export const userController = new UserController(userService);
