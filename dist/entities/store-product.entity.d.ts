import { Store } from './store.entity';
import { Product } from './product.entity';
export declare class StoreProduct {
    id: number;
    store: Store;
    product: Product;
    price: number;
    stock: number;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
