import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderItem } from './OrderItem';
import { Payment } from './Payment';
import { User } from './User';

@Entity()
export class OrderList {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 5 })
  state: string;

  @Column({ type: 'varchar', length: 200 })
  orderMemo: string;

  @Column({ type: 'varchar', length: 20 })
  receiver: string;

  @Column({ type: 'varchar', length: 7 })
  zipCode: string;

  @Column({ type: 'varchar', length: 50 })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  subAddress: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Payment, (payment) => payment.id)
  payment: number;

  @ManyToOne(() => User, (user) => user.id)
  user: number;
}
