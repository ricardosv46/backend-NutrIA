import { Controller, Get, Post, Query, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MealsService } from './meals.service';
import { WeeklyPlanResponseDto } from './dto/weekly-plan-response.dto';

@ApiTags('meals')
@Controller('meals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get('weekly-plan')
  @ApiOperation({ summary: 'Get weekly meal plan (generates if not exists)' })
  @ApiQuery({
    name: 'week',
    required: false,
    description: 'Week start date (YYYY-MM-DD). Defaults to current week',
    example: '2025-01-06',
  })
  @ApiResponse({
    status: 200,
    description: 'Weekly meal plan retrieved successfully',
    type: WeeklyPlanResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found or no meals available' })
  async getWeeklyPlan(
    @Request() req,
    @Query('week') week?: string,
  ): Promise<WeeklyPlanResponseDto> {
    const weekStart = week ? new Date(week) : undefined;
    return await this.mealsService.getWeeklyPlan(req.user.sub, weekStart);
  }

  @Post('weekly-plan/regenerate')
  @ApiOperation({ summary: 'Regenerate weekly meal plan (forces new generation)' })
  @ApiQuery({
    name: 'week',
    required: false,
    description: 'Week start date (YYYY-MM-DD). Defaults to current week',
    example: '2025-01-06',
  })
  @ApiResponse({
    status: 200,
    description: 'Weekly meal plan regenerated successfully',
    type: WeeklyPlanResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found or no meals available' })
  async regenerateWeeklyPlan(
    @Request() req,
    @Query('week') week?: string,
  ): Promise<WeeklyPlanResponseDto> {
    const weekStart = week ? new Date(week) : undefined;
    return await this.mealsService.regenerateWeeklyPlan(req.user.sub, weekStart);
  }
}

