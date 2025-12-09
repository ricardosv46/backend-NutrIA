import { ApiProperty } from "@nestjs/swagger";
import { DayPlanDto } from "./day-plan.dto";

export class WeeklyPlanResponseDto {
  @ApiProperty({ example: "2025-01-06" })
  weekStartDate: string;

  @ApiProperty({ example: 14000 })
  totalCalories: number;

  @ApiProperty({ example: 1050 })
  totalProtein: number;

  @ApiProperty({ example: 1400 })
  totalCarbs: number;

  @ApiProperty({ example: 420 })
  totalFats: number;

  @ApiProperty({
    description: "Weekly meal plan by day",
    example: {
      monday: {
        breakfast: {
          name: "Bowl de Avena",
          calories: 450,
          protein: 15,
          carbs: 65,
          fats: 12,
          image: "",
          description: "...",
        },
        lunch: {
          name: "Salmón",
          calories: 650,
          protein: 45,
          carbs: 40,
          fats: 28,
          image: "",
          description: "...",
        },
        dinner: {
          name: "Pollo",
          calories: 520,
          protein: 42,
          carbs: 35,
          fats: 18,
          image: "",
          description: "...",
        },
        snack: {
          name: "Smoothie",
          calories: 280,
          protein: 25,
          carbs: 30,
          fats: 8,
          image: "",
          description: "...",
        },
      },
    },
  })
  plans: {
    monday: DayPlanDto;
    tuesday: DayPlanDto;
    wednesday: DayPlanDto;
    thursday: DayPlanDto;
    friday: DayPlanDto;
    saturday: DayPlanDto;
    sunday: DayPlanDto;
  };
}
