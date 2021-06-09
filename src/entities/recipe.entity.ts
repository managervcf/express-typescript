import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User, Ingredient } from './';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  instructions!: string;

  @Column({ nullable: false })
  url!: string;

  @Column({ name: 'preparation_time', nullable: false })
  preparationTime!: number;

  @ManyToOne(_type => User, user => user.recipes, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(_type => Ingredient, ingredient => ingredient.recipe, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  ingredients!: Ingredient[];
}
