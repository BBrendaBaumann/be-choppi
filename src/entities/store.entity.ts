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

@Entity({ name: 'stores' })
export class Store {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty()
  @Column({ unique: true })
  name!: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  description!: string;

  @ApiProperty()
  @Column({ default: false })
  deleted!: boolean;

  @ApiProperty()
  @OneToMany(() => StoreProduct, sp => sp.store)
  storeProducts!: StoreProduct[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt!: Date;
}
