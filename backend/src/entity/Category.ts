import {
  Column,
  CreateDateColumn,
  Entity,
<<<<<<< HEAD
  JoinColumn,
=======
  ManyToMany,
>>>>>>> b810f5b (add: Create Sub 카테고리)
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true })
  name: string;

  // @Column({type : ''})

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Category, (category) => category.id, { nullable: true })
  categories!: Category;
}
