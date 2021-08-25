import { Goods } from '../entity/Goods';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { ReviewImg } from './ReviewImg';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'int' })
  rate: number;

  @Column({ type: 'varchar', length: 500 })
  contents: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Goods, (goods) => goods.id)
  goods: Goods;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => ReviewImg, (reviewImg) => reviewImg.review)
  reviewImgs: ReviewImg;
}
