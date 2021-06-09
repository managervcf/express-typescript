import { Request, Response, NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { config } from '../config';
import { recipeRepository } from '../repositories';
import { ICurrentUser, IToken, UserRoles } from '../types';

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
    return res.send({ message: 'Not authenticated' });
  }

  const token = req.headers.authorization;

  let user: ICurrentUser | null;
  try {
    user = verifyToken(token);
  } catch (error) {
    return res.send({ message: 'Invalid token' });
  }

  if (!user) {
    return res.send({ message: 'Not authorized' });
  } else if (UserRoles.Admin) {
    return next();
  }

  const foundRecipe = await recipeRepository.getRecipe(Number(req.params.id));

  if (!foundRecipe) {
    return res.send({ message: 'Recipe not found' });
  }

  if (foundRecipe.user.email !== user.email) {
    return res.send({ message: 'Not a recipe owner' });
  }

  return next();
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
    return res.send({ message: 'Not authenticated' });
  }

  const token = req.headers.authorization;

  let user: ICurrentUser | null;
  try {
    user = verifyToken(token);
  } catch (error) {
    return res.send({ message: 'Invalid token' });
  }

  if (!user) {
    return res.send({ message: 'Not authenticated' });
  } else {
    req.body.currentUser = user;
    return next();
  }
}
