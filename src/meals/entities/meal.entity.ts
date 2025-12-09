import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MealType } from '../../common/enums/meal-type.enum';

@Entity('meals')
export class Meal {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Bowl de Avena con Frutas' })
  @Column()
  name: string;

  @ApiProperty({ example: 450 })
  @Column({ type: 'decimal', precision: 6, scale: 2 })
  calories: number;

  @ApiProperty({ example: 15 })
  @Column({ type: 'decimal', precision: 6, scale: 2 })
  protein: number;

  @ApiProperty({ example: 65 })
  @Column({ type: 'decimal', precision: 6, scale: 2 })
  carbs: number;

  @ApiProperty({ example: 12 })
  @Column({ type: 'decimal', precision: 6, scale: 2 })
  fats: number;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-...' })
  @Column({ type: 'text' })
  image: string;

  @ApiProperty({ example: 'Avena integral con plátano, arándanos, almendras y miel' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ enum: MealType })
  @Column({
    type: 'varchar',
    enum: MealType,
  })
  mealType: MealType;

  @ApiProperty({ example: 'high_protein', required: false })
  @Column({ nullable: true })
  category: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}

