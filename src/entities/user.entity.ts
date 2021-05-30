import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { hashSync, compareSync } from 'bcrypt';
import { Recipe } from './recipe.entity';
import { config } from '../config';
import { UserRoles } from '../types/enums/user-roles.enum';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false, select: false })
  password!: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.User,
  })
  role!: UserRoles;

  @OneToMany(_type => Recipe, recipe => recipe.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  recipes!: Recipe[];

  public hashPassword(): void {
    this.password = hashSync(this.password, config.saltRounds);
  }

  public checkIfUnencryptedPasswordIsValid(
    unencryptedPassword: string
  ): boolean {
    return compareSync(unencryptedPassword, this.password);
  }
}
