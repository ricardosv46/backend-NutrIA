import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "../../common/enums/gender.enum";
import { Goal } from "../../common/enums/goal.enum";

@Entity("users")
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "John Doe" })
  @Column()
  name: string;

  @ApiProperty({ example: "john@example.com" })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty({ example: 70.5, required: false })
  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  weight: number;

  @ApiProperty({ example: 175, required: false })
  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  height: number;

  @ApiProperty({ example: 30, required: false })
  @Column({ nullable: true })
  age: number;

  @ApiProperty({ enum: Gender, required: false })
  @Column({
    type: "varchar",
    nullable: true,
  })
  gender: Gender;

  @ApiProperty({ enum: Goal, required: false })
  @Column({
    type: "varchar",
    nullable: true,
  })
  goal: Goal;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
