import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Goods } from './Goods';

@Entity()
export class DeliveryInfo {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'varchar', length: 10 })
  name!: string;

  @Column({ type: 'int' })
  deliveryFee!: number;

  @Column({ type: 'varchar', length: 20 })
  deliveryDetail!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => Goods, (goods) => goods.deliveryInfoId)
  goods!: Goods[];
}
