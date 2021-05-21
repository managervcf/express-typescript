import { Request, Response } from 'express';
import { User } from '../models';
import { UserService, userService } from '../services';

class UserController {
  constructor(private userService: UserService) {}

  public getUsers = async (
    _req: Request,
    res: Response
  ): Promise<Response<User[]>> => {
    const users = await this.userService.getUsers();
    return res.send(users);
  };

  public createUser = async (
    req: Request,
    res: Response
  ): Promise<Response<User>> => {
    const newUser = await this.userService.createUser(req.body);
    return res.send(newUser);
  };

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
