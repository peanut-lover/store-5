import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @Column({ type: 'int', nullable: true })
  countOfSell: number;

  @Column({ type: 'varchar', length: 5 })
  state: string;

  @Column({ type: 'boolean', default: false })
  isGreen: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

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
