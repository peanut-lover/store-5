import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './OrderItem';
import { Payment } from './Payment';
import { User } from './User';

@Entity()
export class OrderList {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'int' })
  state!: number;

  @Column({ type: 'varchar', length: 200 })
  orderMemo!: string;

  @Column({ type: 'varchar', length: 20 })
  receiver!: string;

  @Column({ type: 'varchar', length: 7 })
  zipCode!: string;

  @Column({ type: 'varchar', length: 50 })
  address!: string;

  @Column({ type: 'varchar', length: 50 })
  subAddress!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => Payment, (payment) => payment.id)
  paymentId!: Payment;

  @ManyToOne(() => User, (user) => user.id)
  userId!: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orderListId)
  orderItems!: OrderItem[];
}
