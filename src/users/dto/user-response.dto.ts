import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "../../common/enums/gender.enum";
import { Goal } from "../../common/enums/goal.enum";

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "John Doe" })
  name: string;

  @ApiProperty({ example: "john@example.com" })
  email: string;

  @ApiProperty({ example: 70.5, required: false, nullable: true })
  weight?: number;

  @ApiProperty({ example: 175, required: false, nullable: true })
  height?: number;

  @ApiProperty({ example: 30, required: false, nullable: true })
  age?: number;

  @ApiProperty({ enum: Gender, required: false, nullable: true })
  gender?: Gender;

  @ApiProperty({ enum: Goal, required: false, nullable: true })
  goal?: Goal;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
