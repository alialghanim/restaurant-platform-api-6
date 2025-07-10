import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Item } from '../item/entities/item.entity';
import { Category } from '../category/entities/category.entity';
import { RestaurantStatus } from '../constants/restaurant-status.enum';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({ nullable: true })
  storeColor?: string;

  @Column({ nullable: true })
  phone?: string;

@Column({ type: 'json', nullable: true })
restaurantLocation: {
  lat: number;
  lng: number;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  postcode: string;
};

  @Column({ nullable: true })
  cuisine?: string;

  @Column({ nullable: true })
  image?: string;

 @Column({ nullable: true, unique: true })
domainName?: string;

  @Column({ nullable: true })
  customPhone?: string;

  @Column({ nullable: true })
useAccountNumber?: boolean;

@OneToMany(() => Item, (item) => item.restaurant)
items: Item[];

 @Column({
  type: 'enum',
  enum: RestaurantStatus,
  default: RestaurantStatus.ACTIVE,
})
status: RestaurantStatus;

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;

@Column({
  type: 'timestamp',
  default: () => 'CURRENT_TIMESTAMP',
  onUpdate: 'CURRENT_TIMESTAMP',
})
updatedAt: Date;

@OneToMany(() => Category, (category) => category.restaurant)
categories: Category[];

  @OneToOne(() => User, (user) => user.restaurant, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ type: 'uuid' })
  ownerId: string;
}
