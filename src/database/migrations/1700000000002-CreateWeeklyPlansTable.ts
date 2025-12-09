import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateWeeklyPlansTable1700000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "weekly_plans",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "user_id",
            type: "uuid",
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

    // Add foreign key to users
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

    // Create trigger for updatedAt
    await queryRunner.query(`
      CREATE TRIGGER update_weekly_plans_updated_at BEFORE UPDATE ON weekly_plans
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_weekly_plans_updated_at ON weekly_plans`
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_weekly_plans_user_week"`
    );
    await queryRunner.dropTable("weekly_plans");
  }
}
