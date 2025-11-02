import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from 'typeorm';
import { Store } from './store.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'store_products' })
export class StoreProduct {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @ManyToOne(() => Store, store => store.storeProducts, { onDelete: 'CASCADE' })
  store!: Store;

  @ApiProperty()
  @ManyToOne(() => Product, product => product.storeProducts, { eager: true, onDelete: 'CASCADE' })
  product!: Product;

  @ApiProperty()
  @Column('decimal', { precision: 12, scale: 2 })
  price!: number;

  @ApiProperty()
  @Column('int', { default: 0 })
  stock!: number;

  @ApiProperty()
  @Index()
  @Column({ default: false })
  deleted!: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt!: Date;
}
