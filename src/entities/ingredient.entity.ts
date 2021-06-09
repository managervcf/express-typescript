import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Recipe } from './';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  amount!: number;

  @Column({ nullable: true })
  unit!: string;

  @ManyToOne(_type => Recipe, recipe => recipe.ingredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'recipe_id' })
  recipe!: Recipe;
}
