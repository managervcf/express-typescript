import { getRepository } from 'typeorm';
import { Ingredient, Recipe, RecipeIngredient, Unit, User } from '../entities';
import { CreateRecipeDto, IIngredient, UpdateRecipeDto } from '../types';

export class RecipeRepository {
  /**
   * Retrieves all recipes.
   */
  public async getRecipes(): Promise<Recipe[]> {
    const foundRecipes = await getRepository(Recipe).find();

    console.dir('All recipes ---------------->', { colors: true });
    console.dir(foundRecipes, { depth: Infinity, colors: true });

    return foundRecipes;
  }

  /**
   * Creates a new recipe.
   */
  public async createRecipe(
    createRecipeDto: CreateRecipeDto,
    userId: number
  ): Promise<Recipe> {
    const newIngredient = new Ingredient();
    const newRecipeIngredient = new RecipeIngredient();
    const newUnit = new Unit();
    let newRecipe = new Recipe();

    const foundUser = await getRepository(User).findOne({ id: userId });
    if (!foundUser) {
      throw new Error('user not found');
    }

    newRecipe = {
      ...newRecipe,
      name: createRecipeDto.name,
      description: createRecipeDto.description,
      instructions: createRecipeDto.instructions,
      url: createRecipeDto.url,
      preparationTime: createRecipeDto.preparationTime,
      recipeIngredients: createRecipeDto.ingredients.map(ingredient => ({
        ...newRecipeIngredient,
        amount: ingredient.amount,
        unit: {
          ...newUnit,
          label: ingredient.unit,
        },
        ingredient: {
          ...newIngredient,
          label: ingredient.name,
        },
      })),
      user: foundUser,
    };

    const insertedRecipe = await getRepository(Recipe).save(newRecipe);

    console.dir('Inserted recipe ---------------->', { colors: true });
    console.dir(insertedRecipe, { depth: Infinity, colors: true });

    return insertedRecipe;
  }

  /**
   * Retrieves a recipe by id.
   */
  public async getRecipe(id: number): Promise<Recipe | null> {
    const foundRecipe = await getRepository(Recipe).findOne({ id });
    console.dir(`Found recipe with id: ${id} ---------------->`, {
      colors: true,
    });
    console.dir(foundRecipe, { depth: Infinity, colors: true });
    return foundRecipe ?? null;
  }

  /**
   * Updates a recipe by id.
   */
  public async updateRecipe(
    id: number,
    updateRecipeDto: UpdateRecipeDto
  ): Promise<Recipe | null> {
    const newIngredient = new Ingredient();
    const newRecipeIngredient = new RecipeIngredient();
    const newUnit = new Unit();
    const foundRecipe = await getRepository(Recipe).findOne({ id });

    if (!foundRecipe) {
      return null;
    }

    foundRecipe.description = updateRecipeDto.description;
    foundRecipe.instructions = updateRecipeDto.instructions;
    foundRecipe.name = updateRecipeDto.name;
    foundRecipe.url = updateRecipeDto.url;
    foundRecipe.preparationTime = updateRecipeDto.preparationTime;
    foundRecipe.recipeIngredients = updateRecipeDto.ingredients.map(
      ingredient => ({
        ...newRecipeIngredient,
        amount: ingredient.amount,
        unit: {
          ...newUnit,
          label: ingredient.unit,
        },
        ingredient: {
          ...newIngredient,
          label: ingredient.name,
        },
      })
    );

    const updatedRecipe = await getRepository(Recipe).save(foundRecipe);

    console.dir('Updated recipe ---------------->', { colors: true });
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

    console.dir('Deleted result ---------------->', { colors: true });
    console.dir(deletedResult, { depth: Infinity, colors: true });

    return !!deletedResult.affected;
  }
}

export const recipeRepository = new RecipeRepository();
