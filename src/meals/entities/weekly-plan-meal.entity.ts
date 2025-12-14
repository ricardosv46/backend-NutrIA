import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { WeeklyPlan } from './weekly-plan.entity';
import { Meal } from './meal.entity';
import { DayOfWeek } from '../../common/enums/day-of-week.enum';
import { MealType } from '../../common/enums/meal-type.enum';

@Entity('weekly_plan_meals')
export class WeeklyPlanMeal {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'weekly_plan_id' })
  weeklyPlanId: string;

  @ManyToOne(() => WeeklyPlan, (weeklyPlan) => weeklyPlan.weeklyPlanMeals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'weekly_plan_id' })
  weeklyPlan: WeeklyPlan;

  @ApiProperty()
  @Column({ name: 'meal_id' })
  mealId: string;

  @ManyToOne(() => Meal)
  @JoinColumn({ name: 'meal_id' })
  meal: Meal;

  @ApiProperty({ enum: DayOfWeek })
  @Column({
    type: 'varchar',
    enum: DayOfWeek,
  })
  day: DayOfWeek;

  @ApiProperty({ enum: MealType })
  @Column({
    type: 'varchar',
    name: 'meal_type',
    enum: MealType,
  })
  mealType: MealType;

  @CreateDateColumn()
  createdAt: Date;
}





