export interface CreateRecipeDto {
  name: string;
  description: string;
  instructions: string;
  url: string;
  preparationTime: number;
  ingredients: IIngredient[];
}

export interface IIngredient {
  name: string;
  amount: number;
  unit: string;
}
