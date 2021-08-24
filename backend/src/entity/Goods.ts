import { GoodsImg } from './GoodsImg';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ type: 'int', default: 0 })
  countOfSell: number;

  @Column({ type: 'int', default: 0 })
  view: number;

  @Column({ type: 'varchar', length: 5 })
  state: string;

  @Column({ type: 'boolean' })
  isGreen: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => DeliveryInfo, (deliveryInfo) => deliveryInfo.id)
  @JoinColumn()
  deliveryInfo: DeliveryInfo;

  @OneToMany(() => GoodsImg, (goodsImg) => goodsImg.goods)
  goodsImgs: GoodsImg[];
}
