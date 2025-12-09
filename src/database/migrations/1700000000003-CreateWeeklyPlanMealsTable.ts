import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateWeeklyPlanMealsTable1700000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'weekly_plan_meals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'weekly_plan_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'meal_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'day',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'meal_type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Add foreign keys
    await queryRunner.createForeignKey(
      'weekly_plan_meals',
      new TableForeignKey({
        columnNames: ['weekly_plan_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'weekly_plans',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'weekly_plan_meals',
      new TableForeignKey({
        columnNames: ['meal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'meals',
        onDelete: 'CASCADE',
      }),
    );

    // Add CHECK constraints
    await queryRunner.query(
      `ALTER TABLE "weekly_plan_meals" ADD CONSTRAINT "CHK_weekly_plan_meals_day" CHECK (day IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'))`,
    );
    await queryRunner.query(
      `ALTER TABLE "weekly_plan_meals" ADD CONSTRAINT "CHK_weekly_plan_meals_meal_type" CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack'))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('weekly_plan_meals');
  }
}

