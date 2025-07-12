import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany, // ✅ أضف هذا
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Section } from './section.entity'; // أو المسار الصحيح إذا مختلف

import { Category } from '../../category/entities/category.entity';
import { Restaurant } from '../../../entities/restaurant.entity';
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

  @OneToMany(() => Section, (section) => section.item, {
    cascade: true,
  })
  sections: Section[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
