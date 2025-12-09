import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsEnum, Min, Max } from 'class-validator';
import { Gender } from '../../common/enums/gender.enum';
import { Goal } from '../../common/enums/goal.enum';

export class UpdateUserDto {
  @ApiProperty({ example: 70.5, required: false })
  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(300)
  weight?: number;

  @ApiProperty({ example: 175, required: false })
  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(250)
  height?: number;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber()
  @Min(10)
  @Max(120)
  age?: number;

  @ApiProperty({ enum: Gender, required: false })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ enum: Goal, required: false })
  @IsOptional()
  @IsEnum(Goal)
  goal?: Goal;
}

