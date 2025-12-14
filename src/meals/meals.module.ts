import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { Meal } from './entities/meal.entity';
import { WeeklyPlan } from './entities/weekly-plan.entity';
import { WeeklyPlanMeal } from './entities/weekly-plan-meal.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal, WeeklyPlan, WeeklyPlanMeal, User]),
    UsersModule,
  ],
  controllers: [MealsController],
  providers: [MealsService],
  exports: [MealsService],
})
export class MealsModule {}





