import { StoreProduct } from './store-product.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    deleted: boolean;
    storeProducts: StoreProduct[];
    createdAt: Date;
    updatedAt: Date;
}
