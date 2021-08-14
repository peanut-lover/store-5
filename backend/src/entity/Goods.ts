import { Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Cart } from './Cart';
import { Category } from './Category';
import { GoodsImg } from './GoodsImg';
import { OrderItem } from './OrderItem';

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

  @Column({ type: 'int', nullable: true })
  countOfSell!: number;

  @Column({ type: 'varchar', length: 5 })
  state!: string;

  @Column({ type: 'boolean', default: false })
  isGreen!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => Category, (category) => category.id)
  category!: Category;

  @OneToMany(() => GoodsImg, (goodsImg) => goodsImg.goodsId)
  goodsImgs!: GoodsImg[];

  @OneToMany(() => Cart, (cart) => cart.goodsId)
  carts!: Cart[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.goodsId)
  orderItems!: OrderItem[];
}
