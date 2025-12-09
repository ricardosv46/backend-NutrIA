import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMealsTable1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "meals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
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

    // Add CHECK constraint for mealType
    await queryRunner.query(
      `ALTER TABLE "meals" ADD CONSTRAINT "CHK_meals_mealType" CHECK ("mealType" IN ('breakfast', 'lunch', 'dinner', 'snack'))`
    );

    // Create trigger for updatedAt
    await queryRunner.query(`
      CREATE TRIGGER update_meals_updated_at BEFORE UPDATE ON meals
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS update_meals_updated_at ON meals`
    );
    await queryRunner.dropTable("meals");
  }
}
