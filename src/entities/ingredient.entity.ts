import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecipeIngredient } from './';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  label!: string;

  @OneToMany(
    _type => RecipeIngredient,
    recipeIngredient => recipeIngredient.unit
  )
  recipeIngredients!: RecipeIngredient[];
}
