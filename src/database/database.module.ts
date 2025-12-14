import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "../users/entities/user.entity";
import { Meal } from "../meals/entities/meal.entity";
import { WeeklyPlan } from "../meals/entities/weekly-plan.entity";
import { WeeklyPlanMeal } from "../meals/entities/weekly-plan-meal.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log("🔍 [DEBUG] Creating database configuration...");
        const config = {
          type: "postgres" as const,
          host: configService.get("DATABASE_HOST") || "localhost",
          port: +configService.get<number>("DATABASE_PORT") || 5432,
          username: configService.get("DATABASE_USER") || "postgres",
          password: configService.get("DATABASE_PASSWORD") || "postgres",
          database: configService.get("DATABASE_NAME") || "nutrition_app",
          entities: [User, Meal, WeeklyPlan, WeeklyPlanMeal],
          synchronize: false,
          migrations: ["dist/database/migrations/*.js"],
          migrationsRun: false,
          retryAttempts: 3,
          retryDelay: 3000,
          logging: true,
          ssl:
            configService.get("DATABASE_SSL") === "true"
              ? { rejectUnauthorized: false }
              : false,
        };
        console.log("🔍 [DEBUG] Database config:", {
          host: config.host,
          port: config.port,
          database: config.database,
          username: config.username,
          password: config.password ? "***" : "NOT SET",
        });
        console.log("🔍 [DEBUG] Attempting to connect to database...");
        return config;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
