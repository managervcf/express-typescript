import { recipeService, userService } from '../services';
import { ICreateRecipeDto, ICreateUserDto } from '../types';

/**
 * Seed the database with dummy data.
 */
export async function seedDb() {
  /**
   * Example data.
   */
  const user: ICreateUserDto = {
    email: 'john@doe.com',
    password: '1234',
    adminSecret: 'super-secret-admin',
  };

  const recipe1: ICreateRecipeDto = {
    name: 'Potato salad',
    description: 'This is the best salad ever',
    instructions: 'Instructions so instructive, wow',
    url: 'http://very-nice-address-for-a-picture.com',
    preparationTime: 60,
    ingredients: [
      {
        name: 'potatos',
        unit: 'kg',
        amount: 2,
      },
      {
        name: 'mayo',
        unit: 'g',
        amount: 20,
      },

      {
        name: 'carrots',
        unit: 'g',
        amount: 400,
      },
    ],
  };

  const recipe2: ICreateRecipeDto = {
    name: 'Oatmeal',
    description: 'This is the best oatmeal ever',
    instructions: 'Instructions so instructive, wow',
    url: 'http://very-nice-address-for-a-picture.com',
    preparationTime: 20,
    ingredients: [
      {
        name: 'oats',
        unit: 'g',
        amount: 200,
      },
      {
        name: 'water',
        unit: 'ml',
        amount: 400,
      },
    ],
  };

  /**
   * Seed the database with 1 user and 2 recipes.
   */
  const createdUser = await userService.createUser(user);

  await recipeService.createRecipe({
    createRecipeDto: recipe1,
    currentUser: createdUser,
  });

  await recipeService.createRecipe({
    createRecipeDto: recipe2,
    currentUser: createdUser,
  });
}
