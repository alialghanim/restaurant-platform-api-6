import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Section } from "./section.entity";

@Entity()
export class Option {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "float", default: 0 })
  price: number;

  @ManyToOne(() => Section, section => section.options, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'sectionId' })
  section: Section;

  @Column()
  sectionId: string;
}