import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './Cart';
import { OrderList } from './OrderList';
import { UserAddress } from './UserAddress';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'varchar', length: 10 })
  name!: string;

  @Column({ type: 'varchar', length: 60 })
  password!: string;

  @Column({ type: 'varchar', length: 20 })
  phone!: string;

  @Column({ type: 'boolean' })
  terms_agree!: boolean;

  @Column({ type: 'boolean' })
  privacy_agree!: boolean;

  @Column({ type: 'boolean' })
  third_party_agree!: boolean;

  @Column({ type: 'boolean' })
  marketing_agree!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.userId)
  userAddresses!: UserAddress[];

  @OneToMany(() => Cart, (cart) => cart.userId)
  carts!: Cart[];

  @OneToMany(() => OrderList, (orderList) => orderList.userId)
  orderLists!: OrderList[];
}
