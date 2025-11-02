import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { StoreProduct } from './store-product.entity'; 
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @ApiProperty()
  @OneToMany(() => StoreProduct, sp => sp.product)
  storeProducts!: StoreProduct[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;
  
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt!: Date;
}
