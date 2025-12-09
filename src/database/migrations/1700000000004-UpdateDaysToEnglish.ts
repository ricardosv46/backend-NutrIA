import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDaysToEnglish1700000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Primero eliminar constraint viejo
    await queryRunner.query(
      `ALTER TABLE "weekly_plan_meals" DROP CONSTRAINT IF EXISTS "CHK_weekly_plan_meals_day"`,
    );

    // Actualizar datos existentes de español a inglés
    await queryRunner.query(`
      UPDATE "weekly_plan_meals" 
      SET day = CASE day
        WHEN 'lunes' THEN 'monday'
        WHEN 'martes' THEN 'tuesday'
        WHEN 'miercoles' THEN 'wednesday'
        WHEN 'jueves' THEN 'thursday'
        WHEN 'viernes' THEN 'friday'
        WHEN 'sabado' THEN 'saturday'
        WHEN 'domingo' THEN 'sunday'
        ELSE day
      END
    `);

    // Crear constraint nuevo con inglés
    await queryRunner.query(
      `ALTER TABLE "weekly_plan_meals" ADD CONSTRAINT "CHK_weekly_plan_meals_day" CHECK (day IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir datos de inglés a español
    await queryRunner.query(`
      UPDATE "weekly_plan_meals" 
      SET day = CASE day
        WHEN 'monday' THEN 'lunes'
        WHEN 'tuesday' THEN 'martes'
        WHEN 'wednesday' THEN 'miercoles'
        WHEN 'thursday' THEN 'jueves'
        WHEN 'friday' THEN 'viernes'
        WHEN 'saturday' THEN 'sabado'
        WHEN 'sunday' THEN 'domingo'
        ELSE day
      END
    `);

    // Eliminar constraint nuevo
    await queryRunner.query(
      `ALTER TABLE "weekly_plan_meals" DROP CONSTRAINT IF EXISTS "CHK_weekly_plan_meals_day"`,
    );

    // Restaurar constraint viejo con español
    await queryRunner.query(
      `ALTER TABLE "weekly_plan_meals" ADD CONSTRAINT "CHK_weekly_plan_meals_day" CHECK (day IN ('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'))`,
    );
  }
}

