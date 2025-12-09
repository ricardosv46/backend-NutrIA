import { ApiProperty } from "@nestjs/swagger";

export class MealResponseDto {
  @ApiProperty({ example: "Bowl de Avena con Frutas" })
  name: string;

  @ApiProperty({ example: 450 })
  calories: number;

  @ApiProperty({ example: 15 })
  protein: number;

  @ApiProperty({ example: 65 })
  carbs: number;

  @ApiProperty({ example: 12 })
  fats: number;

  @ApiProperty({ example: "https://images.unsplash.com/photo-..." })
  image: string;

  @ApiProperty({
    example: "Avena integral con plátano, arándanos, almendras y miel",
  })
  description: string;
}
