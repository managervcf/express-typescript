import { Request, Response } from 'express';
import { Recipe } from '../entities';
import { RecipeService, recipeService } from '../services';

class RecipeController {
  constructor(private recipeService: RecipeService) {}

  /**
   * Retrieves all recipes.
   */
  public getRecipes = async (
    _req: Request,
    res: Response
  ): Promise<Response<Recipe[]>> => {
    const recipes = await this.recipeService.getRecipes();
    return res.send(recipes);
  };

  /**
   * Creates a recipe.
   */
  public createRecipe = async (
    req: Request,
    res: Response
  ): Promise<Response<Recipe>> => {
    const newRecipe = await this.recipeService.createRecipe({
      createRecipeDto: req.body,
      currentUser: req.body.currentUser,
    });

    return res.send(newRecipe);
  };

  /**
   * Retrieves a specific recipe.
   */
  public getRecipe = async (
    req: Request,
    res: Response
  ): Promise<Response<Recipe | null>> => {
    const recipe = await this.recipeService.getRecipe(req.params.id);

    if (!recipe) {
      return res.status(404).send({ message: 'No recipe found' });
    } else {
      return res.send(recipe);
    }
  };

  /**
   * Updates a specific recipe.
   */
  public updateRecipe = async (
    req: Request,
    res: Response
  ): Promise<Response<Recipe | null>> => {
    const recipe = await this.recipeService.updateRecipe(
      req.params.id,
      req.body
    );

    if (!recipe) {
      return res.status(404).send({ message: 'No recipe found' });
    } else {
      return res.send(recipe);
    }
  };

  /**
   * Deletes a specific recipe.
   */
  public deleteRecipe = async (
    req: Request,
    res: Response
  ): Promise<Response<boolean>> => {
    const isDeleted = await this.recipeService.deleteRecipe(
      req.params.id,
      req.body.userId
    );

    return res.send(isDeleted);
  };
}

export const recipeController = new RecipeController(recipeService);
