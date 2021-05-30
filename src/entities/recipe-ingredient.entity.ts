import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ingredient, Recipe, Unit } from './';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  amount!: number;

  @ManyToOne(_type => Unit, unit => unit.recipeIngredients, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'unit_id' })
  unit!: Unit;

  @ManyToOne(_type => Ingredient, ingr => ingr.recipeIngredients, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient!: Ingredient;

  @ManyToOne(_type => Recipe, recipe => recipe.recipeIngredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'recipe_id' })
  recipe!: Recipe;
}
