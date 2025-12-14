import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";
import { WeeklyPlanMeal } from "./weekly-plan-meal.entity";

@Entity("weekly_plans")
export class WeeklyPlan {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: "user_id" })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ApiProperty({ example: "2025-01-06" })
  @Column({ type: "date", name: "week_start_date" })
  weekStartDate: Date;

  @ApiProperty({ example: 14000 })
  @Column({ type: "decimal", precision: 8, scale: 2, name: "total_calories" })
  totalCalories: number;

  @ApiProperty({ example: 1050 })
  @Column({ type: "decimal", precision: 8, scale: 2, name: "total_protein" })
  totalProtein: number;

  @ApiProperty({ example: 1400 })
  @Column({ type: "decimal", precision: 8, scale: 2, name: "total_carbs" })
  totalCarbs: number;

  @ApiProperty({ example: 420 })
  @Column({ type: "decimal", precision: 8, scale: 2, name: "total_fats" })
  totalFats: number;

  @OneToMany(
    () => WeeklyPlanMeal,
    (weeklyPlanMeal) => weeklyPlanMeal.weeklyPlan
  )
  weeklyPlanMeals: WeeklyPlanMeal[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
