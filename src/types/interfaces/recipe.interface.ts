export interface ICreateRecipeDto {
  name: string;
  description: string;
  instructions: string;
  url: string;
  preparationTime: number;
  ingredients: IIngredient[];
}

export interface IUpdateRecipeDto extends ICreateRecipeDto {}

export interface IIngredient {
  name: string;
  amount: number;
  unit: string;
}
