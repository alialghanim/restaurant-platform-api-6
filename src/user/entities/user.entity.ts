import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @Column({ unique: true }) email: string;

  @Column({ unique: true }) phone: string; // ✅ أضف هذا السطر

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

 @OneToOne(() => Restaurant, (restaurant) => restaurant.owner, { cascade: true })
restaurant: Restaurant;
  
}