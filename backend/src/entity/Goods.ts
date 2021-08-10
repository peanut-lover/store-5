import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './Cart';
import { Category } from './Category';
import { DeliveryInfo } from './DeliveryInfo';
import { GoodsImg } from './GoodsImg';
import { OrderItem } from './OrderItem';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'varchar', length: 400 })
  thumbnailUrl!: string;

  @Column({ type: 'varchar', length: 30 })
  title!: string;

  @Column({ type: 'int' })
  price!: number;

  @Column({ type: 'int' })
  stock!: number;

  @Column({ type: 'int' })
  discountRate!: number;

  @Column({ type: 'int' })
  state!: number;

  @Column({ type: 'boolean' })
  isGreen!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => Category, (category) => category.id)
  categoryId!: Category;

  @ManyToOne(() => DeliveryInfo, (deliveryInfo) => deliveryInfo.id)
  deliveryInfoId!: DeliveryInfo;

  @OneToMany(() => GoodsImg, (goodsImg) => goodsImg.goodsId)
  GoodsImgs!: GoodsImg[];

  @OneToMany(() => Cart, (cart) => cart.goodsId)
  carts!: Cart[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.goodsId)
  orderItems!: OrderItem[];
}
