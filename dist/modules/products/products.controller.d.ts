import { ProductsService } from './products.service';
import { CreateProductDto } from '@/common/dto/create-product.dto';
import { Product } from '@/entities/product.entity';
export declare class ProductsController {
    private svc;
    constructor(svc: ProductsService);
    findOne(id: number): Promise<Product>;
    findAll(query: {
        page?: number;
        limit?: number;
        q?: string;
    }): Promise<{
        items: Product[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    create(dto: CreateProductDto): Promise<Product>;
    update(id: number, dto: Partial<CreateProductDto>): Promise<Product>;
    remove(id: number): Promise<{
        success: boolean;
        id: number;
    }>;
}
