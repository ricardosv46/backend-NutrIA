-- =====================================================
-- Script SQL para crear la base de datos completa
-- Generado a partir de la migración TypeORM InitialSchema
-- =====================================================

-- Crear la base de datos (ejecutar primero como superusuario si no existe)
-- Si ya estás conectado a la base de datos, omite estas líneas
CREATE DATABASE nutrition_app;

-- =====================================================
-- 1. FUNCIÓN PARA ACTUALIZAR updatedAt AUTOMÁTICAMENTE
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $BODY$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$BODY$ LANGUAGE plpgsql;

-- =====================================================
-- 2. TABLA: users
-- =====================================================

CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "email" VARCHAR NOT NULL UNIQUE,
  "password" VARCHAR NOT NULL,
  "weight" DECIMAL(5, 2),
  "height" DECIMAL(5, 2),
  "age" INTEGER,
  "gender" VARCHAR,
  "goal" VARCHAR,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restricciones CHECK para users
ALTER TABLE "users" 
  ADD CONSTRAINT "CHK_users_gender" 
  CHECK (gender IS NULL OR gender IN ('male', 'female', 'other'));

ALTER TABLE "users" 
  ADD CONSTRAINT "CHK_users_goal" 
  CHECK (goal IS NULL OR goal IN ('lose_weight', 'gain_muscle', 'maintain_weight'));

-- Trigger para actualizar updatedAt en users
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON "users"
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 3. TABLA: meals
-- =====================================================

CREATE TABLE IF NOT EXISTS "meals" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "calories" DECIMAL(6, 2) NOT NULL,
  "protein" DECIMAL(6, 2) NOT NULL,
  "carbs" DECIMAL(6, 2) NOT NULL,
  "fats" DECIMAL(6, 2) NOT NULL,
  "image" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "mealType" VARCHAR NOT NULL,
  "category" VARCHAR,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restricción CHECK para meals mealType
ALTER TABLE "meals" 
  ADD CONSTRAINT "CHK_meals_mealType" 
  CHECK ("mealType" IN ('breakfast', 'lunch', 'dinner', 'snack'));

-- Trigger para actualizar updatedAt en meals
CREATE TRIGGER update_meals_updated_at 
  BEFORE UPDATE ON "meals"
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4. TABLA: weekly_plans
-- =====================================================

CREATE TABLE IF NOT EXISTS "weekly_plans" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "week_start_date" DATE NOT NULL,
  "total_calories" DECIMAL(8, 2) NOT NULL,
  "total_protein" DECIMAL(8, 2) NOT NULL,
  "total_carbs" DECIMAL(8, 2) NOT NULL,
  "total_fats" DECIMAL(8, 2) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key de weekly_plans a users
ALTER TABLE "weekly_plans" 
  ADD CONSTRAINT "FK_weekly_plans_user_id" 
  FOREIGN KEY ("user_id") 
  REFERENCES "users"("id") 
  ON DELETE CASCADE;

-- Índice único para user_id y week_start_date
CREATE UNIQUE INDEX IF NOT EXISTS "IDX_weekly_plans_user_week" 
  ON "weekly_plans" ("user_id", "week_start_date");

-- Trigger para actualizar updatedAt en weekly_plans
CREATE TRIGGER update_weekly_plans_updated_at 
  BEFORE UPDATE ON "weekly_plans"
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. TABLA: weekly_plan_meals
-- =====================================================

CREATE TABLE IF NOT EXISTS "weekly_plan_meals" (
  "id" SERIAL PRIMARY KEY,
  "weekly_plan_id" INTEGER NOT NULL,
  "meal_id" INTEGER NOT NULL,
  "day" VARCHAR NOT NULL,
  "meal_type" VARCHAR NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Foreign keys de weekly_plan_meals
ALTER TABLE "weekly_plan_meals" 
  ADD CONSTRAINT "FK_weekly_plan_meals_weekly_plan_id" 
  FOREIGN KEY ("weekly_plan_id") 
  REFERENCES "weekly_plans"("id") 
  ON DELETE CASCADE;

ALTER TABLE "weekly_plan_meals" 
  ADD CONSTRAINT "FK_weekly_plan_meals_meal_id" 
  FOREIGN KEY ("meal_id") 
  REFERENCES "meals"("id") 
  ON DELETE CASCADE;

-- Restricciones CHECK para weekly_plan_meals
ALTER TABLE "weekly_plan_meals" 
  ADD CONSTRAINT "CHK_weekly_plan_meals_day" 
  CHECK (day IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'));

ALTER TABLE "weekly_plan_meals" 
  ADD CONSTRAINT "CHK_weekly_plan_meals_meal_type" 
  CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack'));

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
