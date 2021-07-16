/**
 * List of response messages.
 */
export enum ResponseMessage {
  UserNotFound = 'No user found',
  RecipeNotFound = 'No recipe found',
  NotAuthenticated = 'Not authenticated',
  NotAuthorized = 'Not authorized',
  NotAdmin = 'Not an admin',
  NotRecipeOwner = 'Not a recipe owner',
  InvalidToken = 'Invalid token',
}
