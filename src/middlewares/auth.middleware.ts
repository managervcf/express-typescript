import { Request, Response, NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { config } from '../config';
import { recipeRepository } from '../repositories';
import {
  ICurrentUser,
  IToken,
  ResponseMessage,
  Route,
  UserRoles,
} from '../types';

/**
 * Creates an authentication token.
 */
export function createToken({ id, email, role }: ICurrentUser): IToken {
  return {
    token: sign({ id, email, role }, config.jwt.secret, {
      expiresIn: config.jwt.expiryTime,
    }),
  };
}

/**
 * Verifies the provided token.
 */
export function verifyToken(token: string): ICurrentUser | null {
  return verify(token, config.jwt.secret) as ICurrentUser;
}

/**
 * Checks if the current user is the recipe owner.
 * 1. Check http headers for authorization token.
 * 2. Verify the token.
 * 3. Check user role.
 * 4. If not admin role, check if the user is the recipe owner.
 * 5. Proceed to the next middleware.
 */
export async function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return res.send({ message: ResponseMessage.NotAuthenticated });
  }

  const token = req.headers.authorization;

  let user: ICurrentUser | null;
  try {
    user = verifyToken(token);
  } catch (error) {
    return res.send({ message: ResponseMessage.InvalidToken });
  }

  if (!user) {
    return res.send({ message: ResponseMessage.NotAuthorized });
  } else if (user.role === UserRoles.Admin) {
    return next();
  }

  if (req.baseUrl.includes(Route.Recipes)) {
    const foundRecipe = await recipeRepository.getRecipe(+req.params.id);

    if (!foundRecipe) {
      return res.send({ message: ResponseMessage.RecipeNotFound });
    }

    if (foundRecipe.user.email !== user.email) {
      return res.send({ message: ResponseMessage.NotRecipeOwner });
    }

    return next();
  } else {
    return res.send({ message: ResponseMessage.NotAdmin });
  }
}

/**
 * Checks if the current user is the recipe owner.
 * 1. Check http headers for authorization token.
 * 2. Verify the token.
 * 3. Attach the user to the body.currentUser property.
 * 4. Proceed to the next middleware.
 */
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return res.send({ message: ResponseMessage.NotAuthenticated });
  }

  const token = req.headers.authorization;

  let user: ICurrentUser | null;
  try {
    user = verifyToken(token);
  } catch (error) {
    return res.send({ message: ResponseMessage.InvalidToken });
  }

  if (!user) {
    return res.send({ message: ResponseMessage.NotAuthenticated });
  } else {
    req.body.currentUser = user;
    return next();
  }
}
