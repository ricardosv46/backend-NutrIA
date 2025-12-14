import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class InitialSchema1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create function for updatedAt trigger
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW."updatedAt" = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create users table
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "weight",
            type: "decimal",
            precision: 5,
            scale: 2,
            isNullable: true,
          },
          {
            name: "height",
            type: "decimal",
            precision: 5,
            scale: 2,
            isNullable: true,
          },
          {
            name: "age",
            type: "int",
            isNullable: true,
          },
          {
            name: "gender",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "goal",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Add CHECK constraints for users
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "CHK_users_gender" CHECK (gender IS NULL OR gender IN ('male', 'female', 'other'))`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "CHK_users_goal" CHECK (goal IS NULL OR goal IN ('lose_weight', 'gain_muscle', 'maintain_weight'))`
    );

    // Create trigger for users updatedAt
    await queryRunner.query(`
      CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    // Create meals table
    await queryRunner.createTable(
      new Table({
        name: "meals",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "calories",
            type: "decimal",
            precision: 6,
            scale: 2,
            isNullable: false,
          },
          {
            name: "protein",
            type: "decimal",
            precision: 6,
            scale: 2,
            isNullable: false,
          },
          {
            name: "carbs",
            type: "decimal",
            precision: 6,
            scale: 2,
            isNullable: false,
          },
          {
            name: "fats",
            type: "decimal",
            precision: 6,
            scale: 2,
            isNullable: false,
          },
          {
            name: "image",
            type: "text",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: false,
          },
          {
            name: "mealType",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "category",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Add CHECK constraint for meals mealType
    await queryRunner.query(
      `ALTER TABLE "meals" ADD CONSTRAINT "CHK_meals_mealType" CHECK ("mealType" IN ('breakfast', 'lunch', 'dinner', 'snack'))`
    );

    // Create trigger for meals updatedAt
    await queryRunner.query(`
      CREATE TRIGGER update_meals_updated_at BEFORE UPDATE ON meals
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    // Create weekly_plans table
    await queryRunner.createTable(
      new Table({
        name: "weekly_plans",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "week_start_date",
            type: "date",
            isNullable: false,
          },
          {
            name: "total_calories",
            type: "decimal",
            precision: 8,
            scale: 2,
            isNullable: false,
          },
          {
            name: "total_protein",
            type: "decimal",
            precision: 8,
            scale: 2,
            isNullable: false,
          },
          {
            name: "total_carbs",
            type: "decimal",
            precision: 8,
            scale: 2,
            isNullable: false,
          },
          {
            name: "total_fats",
            type: "decimal",
            precision: 8,
            scale: 2,
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Add foreign key from weekly_plans to users
    await queryRunner.createForeignKey(
      "weekly_plans",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    // Add unique constraint for user_id and week_start_date
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_weekly_plans_user_week" ON "weekly_plans" ("user_id", "week_start_date")`
    );

    // Create trigger for weekly_plans updatedAt
    await queryRunner.query(`
      CREATE TRIGGER update_weekly_plans_updated_at BEFORE UPDATE ON weekly_plans
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    // Create weekly_plan_meals table
    await queryRunner.createTable(
      new Table({
        name: "weekly_plan_meals",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "weekly_plan_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "meal_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "day",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "meal_type",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Add foreign keys for weekly_plan_meals
    await queryRunner.createForeignKey(
      "weekly_plan_meals",
      new TableForeignKey({
        columnNames: ["weekly_plan_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "weekly_plans",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "weekly_plan_meals",
      new TableForeignKey({
        columnNames: ["meal_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "meals",
        onDelete: "CASCADE",
      })
    );

    // Add CHECK constraints for weekly_plan_meals (already in English from the start)
    await queryRunner.query(
      `ALTER TABLE "weekly_plan_meals" ADD CONSTRAINT "CHK_weekly_plan_meals_day" CHECK (day IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'))`
    );
    await queryRunner.query(
      `ALTER TABLE "weekly_plan_meals" ADD CONSTRAINT "CHK_weekly_plan_meals_meal_type" CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack'))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop triggers
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_weekly_plans_updated_at ON weekly_plans`
    );
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_meals_updated_at ON meals`
    );
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_users_updated_at ON users`
    );

    // Drop tables in reverse order (respecting foreign key dependencies)
    await queryRunner.dropTable("weekly_plan_meals");
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_weekly_plans_user_week"`
    );
    await queryRunner.dropTable("weekly_plans");
    await queryRunner.dropTable("meals");
    await queryRunner.dropTable("users");

    // Drop function
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS update_updated_at_column()`
    );
  }
}
