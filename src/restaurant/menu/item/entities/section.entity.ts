import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Item } from "./item.entity";
import { Option } from "./option.entity";

@Entity()
export class Section {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ default: "single" }) // 'single' or 'multiple'
  type: string;

  @Column({ default: 0 })
  min: number;

  @Column({ default: 1 })
  max: number;

  @ManyToOne(() => Item, item => item.sections, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @Column()
  itemId: string;

  @OneToMany(() => Option, option => option.section, { cascade: true })
  options: Option[];
}
