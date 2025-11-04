import { StoreProduct } from './store-product.entity';
export declare class Store {
    id: number;
    name: string;
    description: string;
    deleted: boolean;
    storeProducts: StoreProduct[];
    createdAt: Date;
    updatedAt: Date;
}
