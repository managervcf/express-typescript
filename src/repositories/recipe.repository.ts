import { getRepository } from 'typeorm';
import { Ingredient, Recipe, User } from '../entities';
import { ICreateRecipeDto, IUpdateRecipeDto } from '../types';

export class RecipeRepository {
  /**
   * Retrieves all recipes.
   */
  public async getRecipes(): Promise<Recipe[]> {
    const foundRecipes = await getRepository(Recipe).find();
    console.dir('All recipes ------>', { colors: true });
    console.dir(foundRecipes, { depth: Infinity, colors: true });

    return foundRecipes;
  }

  /**
   * Creates a new recipe.
   */
  public async createRecipe(
    {
      name,
      description,
      instructions,
      url,
      preparationTime,
      ingredients,
    }: ICreateRecipeDto,
    userId: number
  ): Promise<Recipe> {
    const newIngredient = new Ingredient();
    let newRecipe = new Recipe();

    const foundUser = await getRepository(User).findOne({ id: userId });
    if (!foundUser) {
      throw new Error('user not found');
    }

    newRecipe = {
      ...newRecipe,
      name,
      description,
      instructions,
      url,
      preparationTime,
      ingredients: ingredients.map(({ name, amount, unit }) => ({
        ...newIngredient,
        name,
        amount,
        unit,
      })),
      user: foundUser,
    };

    const insertedRecipe = await getRepository(Recipe).save(newRecipe);
    console.dir('Inserted recipe ------>', { colors: true });
    console.dir(insertedRecipe, { depth: Infinity, colors: true });

    return insertedRecipe;
  }

  /**
   * Retrieves a recipe by id.
   */
  public async getRecipe(id: number): Promise<Recipe | null> {
    const foundRecipe = await getRepository(Recipe).findOne({ id });
    console.dir(`Found recipe with id: '${id}' ------>`, { colors: true });
    console.dir(foundRecipe, { depth: Infinity, colors: true });

    return foundRecipe ?? null;
  }

  /**
   * Updates a recipe by id.
   */
  public async updateRecipe(
    id: number,
    {
      name,
      description,
      instructions,
      url,
      preparationTime,
      ingredients,
    }: IUpdateRecipeDto
  ): Promise<Recipe | null> {
    const newIngredient = new Ingredient();
    const foundRecipe = await getRepository(Recipe).findOne({ id });

    if (!foundRecipe) {
      return null;
    }

    foundRecipe.description = description;
    foundRecipe.instructions = instructions;
    foundRecipe.name = name;
    foundRecipe.url = url;
    foundRecipe.preparationTime = preparationTime;
    foundRecipe.ingredients = ingredients.map(({ name, amount, unit }) => ({
      ...newIngredient,
      name,
      amount,
      unit,
    }));

    const updatedRecipe = await getRepository(Recipe).save(foundRecipe);
    console.dir('Updated recipe ------>', { colors: true });
    console.dir(updatedRecipe, { depth: Infinity, colors: true });

    return updatedRecipe;
  }

  /**
   * Deletes a recipe and connected recipe ingredients.
   */
  public async deleteRecipe(id: number, userId: number): Promise<boolean> {
    const deletedResult = await getRepository(Recipe).delete({
      id,
      user: { id: userId },
    });
    console.dir('Deleted result ------>', { colors: true });
    console.dir(deletedResult, { depth: Infinity, colors: true });

    return !!deletedResult.affected;
  }
}

export const recipeRepository = new RecipeRepository();
