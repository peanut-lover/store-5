import {
  Column,
  CreateDateColumn,
  Entity,
<<<<<<< HEAD
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
=======
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './Cart';
>>>>>>> b810f5b (add: Create Sub 카테고리)
import { Category } from './Category';
import { DeliveryInfo } from './DeliveryInfo';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 400 })
  thumbnailUrl: string;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'int' })
  discountRate: number;

  @Column({ type: 'int' })
  countOfSell!: number;

  @Column({ type: 'int' })
  state!: number;

  @Column({ type: 'boolean' })
  isGreen!: boolean;

  @Column({ type: 'int' })
  deliveryFee!: number;

  @Column({ type: 'varchar', length: 50 })
  deliveryContent!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
  // @Column({ type: 'int' })
  category: number;

  @ManyToOne(() => DeliveryInfo, (deliveryInfo) => deliveryInfo.id)
  // @Column({ type: 'int' })
  @JoinColumn()
  deliveryInfo: number;
  // categoryId!: number;

  // @ManyToOne(() => DeliveryInfo, (deliveryInfo) => deliveryInfo.id)
  // @Column({ type: 'int' })
  // deliveryInfoId!: number;
}
