import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Meal } from "./entities/meal.entity";
import { WeeklyPlan } from "./entities/weekly-plan.entity";
import { WeeklyPlanMeal } from "./entities/weekly-plan-meal.entity";
import { User } from "../users/entities/user.entity";
import { MealType } from "../common/enums/meal-type.enum";
import { DayOfWeek } from "../common/enums/day-of-week.enum";
import { Goal } from "../common/enums/goal.enum";
import { Gender } from "../common/enums/gender.enum";
import { WeeklyPlanResponseDto } from "./dto/weekly-plan-response.dto";
import { DayPlanDto } from "./dto/day-plan.dto";
import { MealResponseDto } from "./dto/meal-response.dto";
import { UsersService } from "../users/users.service";

interface MacroTargets {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    @InjectRepository(WeeklyPlan)
    private readonly weeklyPlanRepository: Repository<WeeklyPlan>,
    @InjectRepository(WeeklyPlanMeal)
    private readonly weeklyPlanMealRepository: Repository<WeeklyPlanMeal>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService
  ) {}

  /**
   * Calcula las necesidades nutricionales del usuario basado en sus datos
   */
  calculateUserNeeds(user: User): MacroTargets {
    if (
      !user.weight ||
      !user.height ||
      !user.age ||
      !user.gender ||
      !user.goal
    ) {
      throw new BadRequestException(
        "User must have weight, height, age, gender, and goal to generate meal plan"
      );
    }

    const weight = Number(user.weight);
    const height = Number(user.height);
    const age = Number(user.age);

    // Calcular BMR (Basal Metabolic Rate) usando fórmula de Mifflin-St Jeor
    let bmr: number;
    if (user.gender === Gender.MALE) {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (user.gender === Gender.FEMALE) {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      // Para 'other', usar promedio
      bmr = 10 * weight + 6.25 * height - 5 * age - 78;
    }

    // Factor de actividad (sedentario = 1.2, ligero = 1.375, moderado = 1.55)
    const activityFactor = 1.375; // Asumimos actividad ligera por defecto

    // Calcular TDEE (Total Daily Energy Expenditure)
    let tdee = bmr * activityFactor;

    // Ajustar según objetivo
    let proteinMultiplier: number;

    switch (user.goal) {
      case Goal.LOSE_WEIGHT:
        tdee = tdee - 500; // Déficit de 500 calorías
        proteinMultiplier = 2.2; // Alta proteína para preservar músculo
        break;
      case Goal.GAIN_MUSCLE:
        tdee = tdee + 300; // Superávit de 300 calorías
        proteinMultiplier = 2.5; // Muy alta proteína
        break;
      case Goal.MAINTAIN_WEIGHT:
      default:
        proteinMultiplier = 1.8; // Proteína moderada
        break;
    }

    // Calcular macros
    const protein = weight * proteinMultiplier; // gramos
    const proteinCalories = protein * 4;

    // Distribución de macros según objetivo
    let carbPercentage: number;
    let fatPercentage: number;

    if (user.goal === Goal.LOSE_WEIGHT) {
      carbPercentage = 0.35; // 35% carbohidratos
      fatPercentage = 0.25; // 25% grasas
    } else if (user.goal === Goal.GAIN_MUSCLE) {
      carbPercentage = 0.45; // 45% carbohidratos
      fatPercentage = 0.2; // 20% grasas
    } else {
      carbPercentage = 0.4; // 40% carbohidratos
      fatPercentage = 0.25; // 25% grasas
    }

    const remainingCalories = tdee - proteinCalories;
    const carbs = (remainingCalories * carbPercentage) / 4; // gramos
    const fats = (remainingCalories * fatPercentage) / 9; // gramos

    return {
      calories: Math.round(tdee),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
    };
  }

  /**
   * Selecciona comidas para un día específico
   */
  private async selectMealsForDay(
    targets: MacroTargets,
    mealType: MealType,
    availableMeals: Meal[],
    usedMealIds: Set<number>
  ): Promise<Meal> {
    // Filtrar comidas por tipo y que no hayan sido usadas
    const candidateMeals = availableMeals.filter(
      (meal) => meal.mealType === mealType && !usedMealIds.has(meal.id)
    );

    if (candidateMeals.length === 0) {
      // Si no hay más comidas disponibles, permitir reutilizar
      const allMealsOfType = availableMeals.filter(
        (meal) => meal.mealType === mealType
      );
      if (allMealsOfType.length > 0) {
        // Seleccionar aleatoriamente
        return allMealsOfType[
          Math.floor(Math.random() * allMealsOfType.length)
        ];
      }
      throw new NotFoundException(`No meals found for type: ${mealType}`);
    }

    // Seleccionar aleatoriamente de las candidatas
    return candidateMeals[Math.floor(Math.random() * candidateMeals.length)];
  }

  /**
   * Genera un plan semanal para un usuario
   */
  async generateWeeklyPlan(
    userId: number,
    weekStart?: Date
  ): Promise<WeeklyPlanResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const targets = this.calculateUserNeeds(user);

    // Calcular fecha de inicio de semana (lunes)
    const startDate = weekStart
      ? new Date(weekStart)
      : this.getWeekStartDate(new Date());

    // Verificar si ya existe un plan para esta semana
    const existingPlan = await this.weeklyPlanRepository.findOne({
      where: {
        userId: userId,
        weekStartDate: startDate,
      },
      relations: ["weeklyPlanMeals", "weeklyPlanMeals.meal"],
    });

    if (existingPlan) {
      return this.mapToResponseDto(existingPlan);
    }

    // Obtener todas las comidas disponibles
    const allMeals = await this.mealRepository.find();

    if (allMeals.length === 0) {
      throw new NotFoundException(
        "No meals available. Please seed the database first."
      );
    }

    // Generar plan para cada día
    const days: DayOfWeek[] = [
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
      DayOfWeek.SATURDAY,
      DayOfWeek.SUNDAY,
    ];

    const mealTypes: MealType[] = [
      MealType.BREAKFAST,
      MealType.LUNCH,
      MealType.DINNER,
      MealType.SNACK,
    ];

    // Crear el plan semanal
    const weeklyPlan = this.weeklyPlanRepository.create({
      userId: userId,
      weekStartDate: startDate,
      totalCalories: targets.calories * 7,
      totalProtein: targets.protein * 7,
      totalCarbs: targets.carbs * 7,
      totalFats: targets.fats * 7,
    });

    const savedPlan = await this.weeklyPlanRepository.save(weeklyPlan);

    // Generar comidas para cada día
    const usedMealIds = new Set<number>();
    const weeklyPlanMeals: WeeklyPlanMeal[] = [];

    for (const day of days) {
      for (const mealType of mealTypes) {
        const selectedMeal = await this.selectMealsForDay(
          targets,
          mealType,
          allMeals,
          usedMealIds
        );

        usedMealIds.add(selectedMeal.id);

        const weeklyPlanMeal = this.weeklyPlanMealRepository.create({
          weeklyPlanId: savedPlan.id,
          mealId: selectedMeal.id,
          day: day,
          mealType: mealType,
        });

        weeklyPlanMeals.push(weeklyPlanMeal);
      }
    }

    await this.weeklyPlanMealRepository.save(weeklyPlanMeals);

    // Cargar el plan completo con relaciones
    const completePlan = await this.weeklyPlanRepository.findOne({
      where: { id: savedPlan.id },
      relations: ["weeklyPlanMeals", "weeklyPlanMeals.meal"],
    });

    return this.mapToResponseDto(completePlan);
  }

  /**
   * Obtiene el plan semanal existente o genera uno nuevo
   */
  async getWeeklyPlan(
    userId: number,
    weekStart?: Date
  ): Promise<WeeklyPlanResponseDto> {
    const startDate = weekStart
      ? new Date(weekStart)
      : this.getWeekStartDate(new Date());

    const existingPlan = await this.weeklyPlanRepository.findOne({
      where: {
        userId: userId,
        weekStartDate: startDate,
      },
      relations: ["weeklyPlanMeals", "weeklyPlanMeals.meal"],
    });

    if (existingPlan) {
      return this.mapToResponseDto(existingPlan);
    }

    // Si no existe, generar uno nuevo
    return this.generateWeeklyPlan(userId, startDate);
  }

  /**
   * Regenera un plan semanal (fuerza nueva generación)
   */
  async regenerateWeeklyPlan(
    userId: number,
    weekStart?: Date
  ): Promise<WeeklyPlanResponseDto> {
    const startDate = weekStart
      ? new Date(weekStart)
      : this.getWeekStartDate(new Date());

    // Eliminar plan existente si existe
    const existingPlan = await this.weeklyPlanRepository.findOne({
      where: {
        userId: userId,
        weekStartDate: startDate,
      },
    });

    if (existingPlan) {
      await this.weeklyPlanRepository.remove(existingPlan);
    }

    // Generar nuevo plan
    return this.generateWeeklyPlan(userId, startDate);
  }

  /**
   * Convierte WeeklyPlan a WeeklyPlanResponseDto
   */
  private mapToResponseDto(plan: WeeklyPlan): WeeklyPlanResponseDto {
    const plans: { [key: string]: DayPlanDto } = {
      monday: { breakfast: null, lunch: null, dinner: null, snack: null },
      tuesday: { breakfast: null, lunch: null, dinner: null, snack: null },
      wednesday: { breakfast: null, lunch: null, dinner: null, snack: null },
      thursday: { breakfast: null, lunch: null, dinner: null, snack: null },
      friday: { breakfast: null, lunch: null, dinner: null, snack: null },
      saturday: { breakfast: null, lunch: null, dinner: null, snack: null },
      sunday: { breakfast: null, lunch: null, dinner: null, snack: null },
    };

    // Mapear comidas a días
    for (const weeklyPlanMeal of plan.weeklyPlanMeals) {
      const mealDto: MealResponseDto = {
        name: weeklyPlanMeal.meal.name,
        calories: Number(weeklyPlanMeal.meal.calories),
        protein: Number(weeklyPlanMeal.meal.protein),
        carbs: Number(weeklyPlanMeal.meal.carbs),
        fats: Number(weeklyPlanMeal.meal.fats),
        image: weeklyPlanMeal.meal.image,
        description: weeklyPlanMeal.meal.description,
      };

      const dayKey = weeklyPlanMeal.day;
      const mealTypeKey = weeklyPlanMeal.mealType;

      if (plans[dayKey]) {
        plans[dayKey][mealTypeKey] = mealDto;
      }
    }

    // Convertir weekStartDate a Date si es string
    const weekStartDate =
      plan.weekStartDate instanceof Date
        ? plan.weekStartDate
        : new Date(plan.weekStartDate);

    return {
      weekStartDate: weekStartDate.toISOString().split("T")[0],
      totalCalories: Number(plan.totalCalories),
      totalProtein: Number(plan.totalProtein),
      totalCarbs: Number(plan.totalCarbs),
      totalFats: Number(plan.totalFats),
      plans: plans as any,
    };
  }

  /**
   * Obtiene la fecha de inicio de semana (lunes)
   */
  private getWeekStartDate(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajustar para que lunes sea 1
    return new Date(d.setDate(diff));
  }
}
