import { ApiProperty } from "@nestjs/swagger";
import { MealResponseDto } from "./meal-response.dto";

export class DayPlanDto {
  @ApiProperty({ type: MealResponseDto })
  breakfast: MealResponseDto;

  @ApiProperty({ type: MealResponseDto })
  lunch: MealResponseDto;

  @ApiProperty({ type: MealResponseDto })
  dinner: MealResponseDto;

  @ApiProperty({ type: MealResponseDto })
  snack: MealResponseDto;
}
