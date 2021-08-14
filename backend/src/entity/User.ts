import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Cart } from './Cart';
import { OrderList } from './OrderList';
import { UserAddress } from './UserAddress';
import { Wish } from './Wish';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  githubId: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'boolean', nullable: true })
  terms_agree: boolean;

  @Column({ type: 'boolean', nullable: true })
  privacy_agree: boolean;

  @Column({ type: 'boolean', nullable: true })
  third_party_agree: boolean;

  @Column({ type: 'boolean', nullable: true })
  marketing_agree: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
