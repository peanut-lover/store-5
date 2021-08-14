import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Goods } from './Goods';
import { OrderList } from './OrderList';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'boolean' })
  discountRate: boolean;

  @Column({ type: 'int' })
  state: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Goods, (goods) => goods.id)
  @JoinColumn()
  goods: Goods;

  @ManyToOne(() => OrderList, (orderList) => orderList.id)
  @JoinColumn()
  orderList: OrderList;
}
