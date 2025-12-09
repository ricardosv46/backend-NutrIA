import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "../users/entities/user.entity";
import { Meal } from "../meals/entities/meal.entity";
import { WeeklyPlan } from "../meals/entities/weekly-plan.entity";
import { WeeklyPlanMeal } from "../meals/entities/weekly-plan-meal.entity";

config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "",
  port: parseInt(process.env.DATABASE_PORT || ""),
  username: process.env.DATABASE_USER || "",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "",
  entities: [User, Meal, WeeklyPlan, WeeklyPlanMeal],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: false,
  ssl: true,
});

export default AppDataSource;
