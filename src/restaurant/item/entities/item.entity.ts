import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, // ✅ أضف هذا
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '../../category/entities/category.entity';
import { Restaurant } from '../../entities/restaurant.entity';
@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

 @Column({ nullable: true })
imageUrl: string;

@ManyToOne(() => Category, (category) => category.items, {
  onDelete: 'CASCADE',
})
@JoinColumn({ name: 'categoryId' })
category: Category;

@Column()
categoryId: string;

@ManyToOne(() => Restaurant, (restaurant) => restaurant.items, {
  onDelete: 'CASCADE',
})
@JoinColumn({ name: 'restaurantId' })
restaurant: Restaurant;

@Column()
restaurantId: string;


  @Column({ default: true })
  isAvailable: boolean;

  @Column({ default: false })
  isUnlimited: boolean;

  @Column({ nullable: true })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
