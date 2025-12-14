-- =====================================================
-- Script SQL para eliminar toda la base de datos
-- Script de rollback completo
-- =====================================================

-- Eliminar triggers
DROP TRIGGER IF EXISTS update_weekly_plans_updated_at ON "weekly_plans";
DROP TRIGGER IF EXISTS update_meals_updated_at ON "meals";
DROP TRIGGER IF EXISTS update_users_updated_at ON "users";

-- Eliminar tablas (en orden inverso para respetar foreign keys)
DROP TABLE IF EXISTS "weekly_plan_meals" CASCADE;
DROP TABLE IF EXISTS "weekly_plans" CASCADE;
DROP TABLE IF EXISTS "meals" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

-- Eliminar índices
DROP INDEX IF EXISTS "IDX_weekly_plans_user_week";

-- Eliminar función
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
