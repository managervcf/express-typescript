import { Get, Route, Tags, Post, Body, Path, Delete, Patch } from 'tsoa';
import { RecipeRepository, recipeRepository } from '../repositories';
import { Recipe } from '../entities';
import { ICreateRecipeDto, ICurrentUser, IUpdateRecipeDto } from '../types';

@Route('/api/recipes')
@Tags('Recipe')
export class RecipeService {
  constructor(private recipeRepository: RecipeRepository) {}

  @Get('/')
  public async getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.getRecipes();
  }

  @Post('/')
  public async createRecipe(
    @Body()
    {
      createRecipeDto,
      currentUser,
    }: {
      createRecipeDto: ICreateRecipeDto;
      currentUser: ICurrentUser;
    }
  ): Promise<Recipe> {
    return this.recipeRepository.createRecipe(createRecipeDto, currentUser.id);
  }

  @Get('/:id')
  public async getRecipe(@Path() id: string): Promise<Recipe | null> {
    return this.recipeRepository.getRecipe(Number(id));
  }

  @Patch('/:id')
  public async updateRecipe(
    @Path() id: string,
    @Body() updateRecipeDto: IUpdateRecipeDto
  ): Promise<Recipe | null> {
    return this.recipeRepository.updateRecipe(Number(id), updateRecipeDto);
  }

  @Delete('/:id')
  public async deleteRecipe(
    @Path() id: string,
    @Body() userId: string
  ): Promise<boolean> {
    return this.recipeRepository.deleteRecipe(Number(id), Number(userId));
  }
}

export const recipeService = new RecipeService(recipeRepository);
