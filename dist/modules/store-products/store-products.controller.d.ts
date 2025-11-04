import { CreateStoreProductDto } from '@/common/dto/create-storeproduct.dto';
import { UpdateStoreProductDto } from '@/common/dto/update-storeproduct.dto';
import { StoreProductsService } from './store-products.service';
export declare class StoreProductsController {
    private svc;
    constructor(svc: StoreProductsService);
    findAll(storeId: number, query: {
        page?: number;
        limit?: number;
        q?: string;
        inStock?: boolean;
    }): Promise<{
        items: import("../../entities/store-product.entity").StoreProduct[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    create(storeId: number, dto: CreateStoreProductDto): Promise<import("../../entities/store-product.entity").StoreProduct>;
    update(storeId: number, spId: number, dto: UpdateStoreProductDto): Promise<import("../../entities/store-product.entity").StoreProduct>;
    remove(storeId: number, spId: number): Promise<import("../../entities/store-product.entity").StoreProduct>;
}
